import React, { useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Position,
} from '@xyflow/react';
import { AnalysisResult, LearningModule } from '../lib/types';
import { buildSkillGraph, SKILL_PREREQUISITES } from '../lib/skillGraph';

interface SkillGraphProps {
  result: AnalysisResult;
  onNodeClick: (module: LearningModule | null) => void;
}

function getNodeColor(skill: string, result: AnalysisResult): { bg: string; border: string; text: string; status: string } {
  const resumeSkill = result.resume_skills.find(s => s.skill === skill);
  const jdSkill = result.jd_skills.find(s => s.skill === skill);
  const gap = result.skill_gaps.find(s => s.skill === skill);
  const isPrereq = result.learning_path.find(s => s.skill === skill && s.is_prerequisite);

  if (isPrereq) {
    return { bg: '#F1F5F9', border: '#CBD5E1', text: '#475569', status: 'prerequisite' };
  }
  if (gap) {
    if (gap.current_level > 0) {
      return { bg: '#FEF3C7', border: '#F59E0B', text: '#B45309', status: 'partial' };
    }
    return { bg: '#FEE2E2', border: '#EF4444', text: '#B91C1C', status: 'gap' };
  }
  if (resumeSkill && jdSkill) {
    return { bg: '#D1FAE5', border: '#10B981', text: '#047857', status: 'matched' };
  }
  if (resumeSkill) {
    return { bg: '#D1FAE5', border: '#10B981', text: '#047857', status: 'have' };
  }
  return { bg: '#F1F5F9', border: '#CBD5E1', text: '#475569', status: 'unknown' };
}

export default function SkillGraph({ result, onNodeClick }: SkillGraphProps) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    buildSkillGraph();
    const relevantSkills = new Set<string>();

    // Include all JD skills, resume skills, and learning path skills
    result.jd_skills.forEach(s => relevantSkills.add(s.skill));
    result.resume_skills.forEach(s => relevantSkills.add(s.skill));
    result.learning_path.forEach(m => relevantSkills.add(m.skill));

    // Also include direct prerequisites of relevant skills
    for (const skill of [...relevantSkills]) {
      const prereqs = SKILL_PREREQUISITES[skill] || [];
      prereqs.forEach(p => relevantSkills.add(p));
    }

    const skillArray = [...relevantSkills];

    // Simple force-directed-like layout by layers
    const layers = new Map<string, number>();

    function getLayer(skill: string, visited: Set<string> = new Set()): number {
      if (visited.has(skill)) return 0;
      visited.add(skill);
      if (layers.has(skill)) return layers.get(skill)!;
      const prereqs = (SKILL_PREREQUISITES[skill] || []).filter(p => relevantSkills.has(p));
      if (prereqs.length === 0) {
        layers.set(skill, 0);
        return 0;
      }
      const maxPrereqLayer = Math.max(...prereqs.map(p => getLayer(p, visited)));
      const layer = maxPrereqLayer + 1;
      layers.set(skill, layer);
      return layer;
    }

    skillArray.forEach(s => getLayer(s));

    // Group by layer
    const layerGroups = new Map<number, string[]>();
    for (const [skill, layer] of layers) {
      if (!layerGroups.has(layer)) layerGroups.set(layer, []);
      layerGroups.get(layer)!.push(skill);
    }

    const nodes: Node[] = [];
    // maxLayer used for layout reference
    void Math.max(...layers.values(), 0);

    for (const [layer, skills] of layerGroups) {
      const xBase = layer * 350;
      skills.forEach((skill, idx) => {
        const color = getNodeColor(skill, result);
        const yBase = (idx - skills.length / 2) * 120;

        nodes.push({
          id: skill,
          position: { x: xBase + 50, y: yBase + 400 },
          data: { label: skill },
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          style: {
            background: color.bg,
            border: `3px solid ${color.border}`,
            color: color.text,
            borderRadius: '14px',
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: 600,
            fontFamily: 'DM Sans, sans-serif',
            cursor: 'pointer',
            minWidth: '160px',
            textAlign: 'center' as const,
            boxShadow: `0 4px 14px ${color.border}40`,
          },
        });
      });
    }

    const edges: Edge[] = [];
    for (const skill of skillArray) {
      const prereqs = (SKILL_PREREQUISITES[skill] || []).filter(p => relevantSkills.has(p));
      for (const prereq of prereqs) {
        const sourceColor = getNodeColor(prereq, result);
        edges.push({
          id: `${prereq}-${skill}`,
          source: prereq,
          target: skill,
          animated: true,
          style: {
            stroke: sourceColor.border,
            strokeWidth: 2,
            opacity: 0.7,
          },
        });
      }
    }

    return { nodes, edges };
  }, [result]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const handleNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const module = result.learning_path.find(m => m.skill === node.id);
    onNodeClick(module || null);
  }, [result.learning_path, onNodeClick]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-deep-space-lighter">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.3}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="rgba(0,0,0,0.08)" />
      </ReactFlow>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass rounded-xl p-3 flex gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-emerald border border-emerald"></div>
          <span className="text-text-muted">Have</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-amber border border-amber"></div>
          <span className="text-text-muted">Partial</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-accent border border-red-accent"></div>
          <span className="text-text-muted">Gap</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gray-600 border border-gray-500"></div>
          <span className="text-text-muted">Prereq Added</span>
        </div>
      </div>
    </div>
  );
}
