import { CourseInfo } from './types';

// Hardcoded, real course catalog — LLM NEVER invents course names
// Covers BOTH technical/desk roles AND operational/labour roles
export const COURSE_CATALOG: Record<string, CourseInfo> = {
  // ===== PROGRAMMING LANGUAGES =====
  "Python": {
    title: "100 Days of Code: The Complete Python Pro Bootcamp",
    platform: "Udemy",
    url: "https://www.udemy.com/course/100-days-of-code/",
    duration_hours: 60,
    level: "beginner"
  },
  "JavaScript": {
    title: "The Complete JavaScript Course 2024",
    platform: "Udemy",
    url: "https://www.udemy.com/course/the-complete-javascript-course/",
    duration_hours: 69,
    level: "beginner"
  },
  "TypeScript": {
    title: "Understanding TypeScript",
    platform: "Udemy",
    url: "https://www.udemy.com/course/understanding-typescript/",
    duration_hours: 15,
    level: "intermediate"
  },
  "Java": {
    title: "Java Programming Masterclass",
    platform: "Udemy",
    url: "https://www.udemy.com/course/java-the-complete-java-developer-course/",
    duration_hours: 80,
    level: "beginner"
  },
  "Go": {
    title: "Programming with Google Go Specialization",
    platform: "Coursera",
    url: "https://www.coursera.org/specializations/google-golang",
    duration_hours: 30,
    level: "intermediate"
  },
  "Rust": {
    title: "The Rust Programming Language",
    platform: "Udemy",
    url: "https://www.udemy.com/course/rust-lang/",
    duration_hours: 20,
    level: "intermediate"
  },
  "C++": {
    title: "Beginning C++ Programming",
    platform: "Udemy",
    url: "https://www.udemy.com/course/beginning-c-plus-plus-programming/",
    duration_hours: 46,
    level: "beginner"
  },

  // ===== WEB DEVELOPMENT =====
  "HTML": {
    title: "HTML and CSS for Beginners",
    platform: "Udemy",
    url: "https://www.udemy.com/course/html-and-css-for-beginners-crash-course-learn-fast-easy/",
    duration_hours: 8,
    level: "beginner"
  },
  "CSS": {
    title: "Advanced CSS and Sass",
    platform: "Udemy",
    url: "https://www.udemy.com/course/advanced-css-and-sass/",
    duration_hours: 28,
    level: "intermediate"
  },
  "React": {
    title: "React - The Complete Guide 2024",
    platform: "Udemy",
    url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
    duration_hours: 68,
    level: "intermediate"
  },
  "Angular": {
    title: "Angular - The Complete Guide",
    platform: "Udemy",
    url: "https://www.udemy.com/course/the-complete-guide-to-angular-2/",
    duration_hours: 37,
    level: "intermediate"
  },
  "Vue.js": {
    title: "Vue - The Complete Guide",
    platform: "Udemy",
    url: "https://www.udemy.com/course/vuejs-2-the-complete-guide/",
    duration_hours: 32,
    level: "intermediate"
  },
  "Node.js": {
    title: "The Complete Node.js Developer Course",
    platform: "Udemy",
    url: "https://www.udemy.com/course/the-complete-nodejs-developer-course-2/",
    duration_hours: 35,
    level: "intermediate"
  },
  "Next.js": {
    title: "Next.js & React - The Complete Guide",
    platform: "Udemy",
    url: "https://www.udemy.com/course/nextjs-react-the-complete-guide/",
    duration_hours: 25,
    level: "intermediate"
  },
  "GraphQL": {
    title: "GraphQL with React: The Complete Developers Guide",
    platform: "Udemy",
    url: "https://www.udemy.com/course/graphql-with-react-course/",
    duration_hours: 13,
    level: "intermediate"
  },
  "REST APIs": {
    title: "REST APIs with Flask and Python",
    platform: "Udemy",
    url: "https://www.udemy.com/course/rest-api-flask-and-python/",
    duration_hours: 17,
    level: "intermediate"
  },

  // ===== BACKEND & FRAMEWORKS =====
  "FastAPI": {
    title: "FastAPI - The Complete Course",
    platform: "Udemy",
    url: "https://www.udemy.com/course/fastapi-the-complete-course/",
    duration_hours: 20,
    level: "intermediate"
  },
  "Django": {
    title: "Python Django - The Practical Guide",
    platform: "Udemy",
    url: "https://www.udemy.com/course/python-django-the-practical-guide/",
    duration_hours: 23,
    level: "intermediate"
  },
  "Pydantic": {
    title: "Pydantic V2: Data Validation in Python",
    platform: "Udemy",
    url: "https://www.udemy.com/course/pydantic/",
    duration_hours: 6,
    level: "intermediate"
  },

  // ===== DEVOPS & CLOUD =====
  "Docker": {
    title: "Docker & Kubernetes: The Complete Guide",
    platform: "Udemy",
    url: "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/",
    duration_hours: 22,
    level: "beginner"
  },
  "Kubernetes": {
    title: "Kubernetes for the Absolute Beginners",
    platform: "Udemy",
    url: "https://www.udemy.com/course/learn-kubernetes/",
    duration_hours: 12,
    level: "intermediate"
  },
  "Linux": {
    title: "Linux Mastery: Master the Linux Command Line",
    platform: "Udemy",
    url: "https://www.udemy.com/course/linux-mastery/",
    duration_hours: 11,
    level: "beginner"
  },
  "AWS": {
    title: "AWS Certified Solutions Architect Associate",
    platform: "Udemy",
    url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/",
    duration_hours: 27,
    level: "intermediate"
  },
  "GCP": {
    title: "Google Cloud Professional Cloud Architect",
    platform: "Coursera",
    url: "https://www.coursera.org/professional-certificates/gcp-cloud-architect",
    duration_hours: 40,
    level: "intermediate"
  },
  "Azure": {
    title: "AZ-900: Microsoft Azure Fundamentals",
    platform: "Udemy",
    url: "https://www.udemy.com/course/az900-azure/",
    duration_hours: 11,
    level: "beginner"
  },
  "CI/CD": {
    title: "The Complete GitHub Actions & Workflows Guide",
    platform: "Udemy",
    url: "https://www.udemy.com/course/github-actions/",
    duration_hours: 10,
    level: "intermediate"
  },
  "Terraform": {
    title: "HashiCorp Certified: Terraform Associate",
    platform: "Udemy",
    url: "https://www.udemy.com/course/terraform-beginner-to-advanced/",
    duration_hours: 18,
    level: "intermediate"
  },
  "Networking Basics": {
    title: "The Complete Networking Fundamentals Course",
    platform: "Udemy",
    url: "https://www.udemy.com/course/complete-networking-fundamentals-course-ccna-start/",
    duration_hours: 65,
    level: "beginner"
  },
  "Git": {
    title: "Git Complete: The Definitive Guide",
    platform: "Udemy",
    url: "https://www.udemy.com/course/git-complete/",
    duration_hours: 6,
    level: "beginner"
  },

  // ===== DATA & AI =====
  "Machine Learning": {
    title: "Machine Learning Specialization",
    platform: "Coursera (Andrew Ng)",
    url: "https://www.coursera.org/specializations/machine-learning-introduction",
    duration_hours: 40,
    level: "intermediate"
  },
  "Deep Learning": {
    title: "Deep Learning Specialization",
    platform: "Coursera (Andrew Ng)",
    url: "https://www.coursera.org/specializations/deep-learning",
    duration_hours: 60,
    level: "advanced"
  },
  "NLP": {
    title: "Natural Language Processing Specialization",
    platform: "Coursera",
    url: "https://www.coursera.org/specializations/natural-language-processing",
    duration_hours: 35,
    level: "advanced"
  },
  "Computer Vision": {
    title: "Deep Learning for Computer Vision",
    platform: "Coursera",
    url: "https://www.coursera.org/learn/convolutional-neural-networks",
    duration_hours: 20,
    level: "advanced"
  },
  "MLOps": {
    title: "Machine Learning Engineering for Production (MLOps)",
    platform: "Coursera",
    url: "https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops",
    duration_hours: 50,
    level: "advanced"
  },
  "Data Science": {
    title: "IBM Data Science Professional Certificate",
    platform: "Coursera",
    url: "https://www.coursera.org/professional-certificates/ibm-data-science",
    duration_hours: 60,
    level: "beginner"
  },
  "Linear Algebra": {
    title: "Mathematics for Machine Learning: Linear Algebra",
    platform: "Coursera",
    url: "https://www.coursera.org/learn/linear-algebra-machine-learning",
    duration_hours: 20,
    level: "intermediate"
  },
  "Statistics": {
    title: "Statistics with Python Specialization",
    platform: "Coursera",
    url: "https://www.coursera.org/specializations/statistics-with-python",
    duration_hours: 30,
    level: "intermediate"
  },
  "TensorFlow": {
    title: "TensorFlow Developer Professional Certificate",
    platform: "Coursera",
    url: "https://www.coursera.org/professional-certificates/tensorflow-in-practice",
    duration_hours: 40,
    level: "intermediate"
  },
  "PyTorch": {
    title: "PyTorch for Deep Learning and Computer Vision",
    platform: "Udemy",
    url: "https://www.udemy.com/course/pytorch-for-deep-learning-and-computer-vision/",
    duration_hours: 10,
    level: "intermediate"
  },

  // ===== DATABASES =====
  "SQL": {
    title: "The Complete SQL Bootcamp",
    platform: "Udemy",
    url: "https://www.udemy.com/course/the-complete-sql-bootcamp/",
    duration_hours: 9,
    level: "beginner"
  },
  "Databases": {
    title: "Database Engineering Complete Course",
    platform: "Udemy",
    url: "https://www.udemy.com/course/database-engines-crash-course/",
    duration_hours: 25,
    level: "intermediate"
  },
  "MongoDB": {
    title: "MongoDB - The Complete Developer's Guide",
    platform: "Udemy",
    url: "https://www.udemy.com/course/mongodb-the-complete-developers-guide/",
    duration_hours: 17,
    level: "intermediate"
  },
  "Redis": {
    title: "Redis: The Complete Developer's Guide",
    platform: "Udemy",
    url: "https://www.udemy.com/course/redis-the-complete-developers-guide-p/",
    duration_hours: 12,
    level: "intermediate"
  },
  "PostgreSQL": {
    title: "SQL and PostgreSQL: The Complete Developer's Guide",
    platform: "Udemy",
    url: "https://www.udemy.com/course/sql-and-postgresql/",
    duration_hours: 22,
    level: "intermediate"
  },

  // ===== CS FUNDAMENTALS =====
  "Data Structures": {
    title: "Data Structures & Algorithms in Python",
    platform: "Udemy",
    url: "https://www.udemy.com/course/data-structures-algorithms-python/",
    duration_hours: 30,
    level: "intermediate"
  },
  "System Design": {
    title: "Grokking the System Design Interview",
    platform: "Educative",
    url: "https://www.educative.io/courses/grokking-modern-system-design-interview-for-engineers-managers",
    duration_hours: 40,
    level: "advanced"
  },
  "Algorithms": {
    title: "Algorithms Specialization",
    platform: "Coursera (Stanford)",
    url: "https://www.coursera.org/specializations/algorithms",
    duration_hours: 60,
    level: "intermediate"
  },

  // ===== SOFT SKILLS / MANAGEMENT =====
  "Communication": {
    title: "Communication Skills for Beginners",
    platform: "Udemy",
    url: "https://www.udemy.com/course/communication-skills-for-beginners/",
    duration_hours: 6,
    level: "beginner"
  },
  "Leadership": {
    title: "Leadership: Practical Leadership Skills",
    platform: "Udemy",
    url: "https://www.udemy.com/course/leadership-practical-leadership-skills/",
    duration_hours: 8,
    level: "intermediate"
  },
  "Project Management": {
    title: "Google Project Management Professional Certificate",
    platform: "Coursera",
    url: "https://www.coursera.org/professional-certificates/google-project-management",
    duration_hours: 40,
    level: "beginner"
  },
  "Agile": {
    title: "Agile with Atlassian Jira",
    platform: "Coursera",
    url: "https://www.coursera.org/learn/agile-atlassian-jira",
    duration_hours: 12,
    level: "beginner"
  },
  "Problem Solving": {
    title: "Creative Problem Solving",
    platform: "Coursera",
    url: "https://www.coursera.org/learn/creative-problem-solving",
    duration_hours: 8,
    level: "beginner"
  },
  "Team Management": {
    title: "Managing People and Teams",
    platform: "Coursera",
    url: "https://www.coursera.org/learn/managing-people-and-teams",
    duration_hours: 10,
    level: "intermediate"
  },

  // ===== OPERATIONAL / LABOUR ROLES =====
  "Safety Compliance": {
    title: "Workplace Health and Safety (WHS/OHS)",
    platform: "Udemy",
    url: "https://www.udemy.com/course/workplace-health-and-safety/",
    duration_hours: 8,
    level: "beginner"
  },
  "OSHA Standards": {
    title: "OSHA Safety Training: General Industry",
    platform: "Udemy",
    url: "https://www.udemy.com/course/osha-30-hour-general-industry/",
    duration_hours: 30,
    level: "beginner"
  },
  "Forklift Operation": {
    title: "Forklift Operator Certification Training",
    platform: "Udemy",
    url: "https://www.udemy.com/course/forklift-certification/",
    duration_hours: 4,
    level: "beginner"
  },
  "Inventory Management": {
    title: "Inventory Management: Complete Guide",
    platform: "Udemy",
    url: "https://www.udemy.com/course/inventory-management-complete-guide/",
    duration_hours: 10,
    level: "beginner"
  },
  "Quality Control": {
    title: "Quality Management and Six Sigma",
    platform: "Coursera",
    url: "https://www.coursera.org/learn/quality-management",
    duration_hours: 15,
    level: "intermediate"
  },
  "Supply Chain Basics": {
    title: "Supply Chain Management Specialization",
    platform: "Coursera",
    url: "https://www.coursera.org/specializations/supply-chain-management",
    duration_hours: 35,
    level: "beginner"
  },
  "Warehouse Management": {
    title: "Warehouse Management: Complete Guide",
    platform: "Udemy",
    url: "https://www.udemy.com/course/warehouse-management/",
    duration_hours: 8,
    level: "beginner"
  },
  "Logistics": {
    title: "Logistics & Supply Chain Management",
    platform: "Coursera",
    url: "https://www.coursera.org/learn/supply-chain-logistics",
    duration_hours: 20,
    level: "intermediate"
  },
  "Lean Manufacturing": {
    title: "Lean Manufacturing: Lean Six Sigma",
    platform: "Udemy",
    url: "https://www.udemy.com/course/lean-manufacturing/",
    duration_hours: 12,
    level: "intermediate"
  },
  "Equipment Maintenance": {
    title: "Maintenance and Reliability Best Practices",
    platform: "Udemy",
    url: "https://www.udemy.com/course/maintenance-reliability/",
    duration_hours: 6,
    level: "beginner"
  },
  "Process Optimization": {
    title: "Business Process Management",
    platform: "Coursera",
    url: "https://www.coursera.org/learn/business-process-management",
    duration_hours: 15,
    level: "intermediate"
  },
  "ERP Systems": {
    title: "SAP ERP Essential Training",
    platform: "Udemy",
    url: "https://www.udemy.com/course/sap-training/",
    duration_hours: 10,
    level: "beginner"
  },
  "Hazardous Materials Handling": {
    title: "HAZWOPER: Hazardous Materials Safety Training",
    platform: "Udemy",
    url: "https://www.udemy.com/course/hazwoper-training/",
    duration_hours: 8,
    level: "beginner"
  },
  "First Aid": {
    title: "First Aid and CPR Certification",
    platform: "Udemy",
    url: "https://www.udemy.com/course/first-aid-cpr/",
    duration_hours: 4,
    level: "beginner"
  },
  "Data Analysis": {
    title: "Google Data Analytics Professional Certificate",
    platform: "Coursera",
    url: "https://www.coursera.org/professional-certificates/google-data-analytics",
    duration_hours: 40,
    level: "beginner"
  },
  "Excel": {
    title: "Microsoft Excel - Data Analysis with Excel Pivot Tables",
    platform: "Udemy",
    url: "https://www.udemy.com/course/data-analysis-with-excel-pivot-tables/",
    duration_hours: 7,
    level: "beginner"
  },
  "Power BI": {
    title: "Microsoft Power BI Desktop for Business Intelligence",
    platform: "Udemy",
    url: "https://www.udemy.com/course/microsoft-power-bi-up-running-with-power-bi-desktop/",
    duration_hours: 14,
    level: "intermediate"
  },
  "Tableau": {
    title: "Tableau 2024 A-Z: Hands-On Tableau Training",
    platform: "Udemy",
    url: "https://www.udemy.com/course/tableau10/",
    duration_hours: 9,
    level: "beginner"
  },
  "Cybersecurity": {
    title: "The Complete Cyber Security Course",
    platform: "Udemy",
    url: "https://www.udemy.com/course/the-complete-internet-security-privacy-course-volume-1/",
    duration_hours: 12,
    level: "beginner"
  },
  "Spark": {
    title: "Apache Spark with Scala - Hands On with Big Data",
    platform: "Udemy",
    url: "https://www.udemy.com/course/apache-spark-with-scala-hands-on-with-big-data/",
    duration_hours: 15,
    level: "intermediate"
  },
  "Kafka": {
    title: "Apache Kafka Series - Learn Apache Kafka for Beginners",
    platform: "Udemy",
    url: "https://www.udemy.com/course/apache-kafka/",
    duration_hours: 8,
    level: "intermediate"
  },
  "Airflow": {
    title: "The Complete Hands-On Introduction to Apache Airflow",
    platform: "Udemy",
    url: "https://www.udemy.com/course/the-complete-hands-on-course-to-master-apache-airflow/",
    duration_hours: 8,
    level: "intermediate"
  },
};

export function getCourseForSkill(skill: string): CourseInfo | null {
  // Direct match
  if (COURSE_CATALOG[skill]) return COURSE_CATALOG[skill];
  
  // Case-insensitive match
  const lowerSkill = skill.toLowerCase();
  for (const [key, course] of Object.entries(COURSE_CATALOG)) {
    if (key.toLowerCase() === lowerSkill) return course;
  }
  
  // Partial match
  for (const [key, course] of Object.entries(COURSE_CATALOG)) {
    if (key.toLowerCase().includes(lowerSkill) || lowerSkill.includes(key.toLowerCase())) {
      return course;
    }
  }
  
  // Fallback: generate a generic entry
  return {
    title: `${skill} - Professional Development Course`,
    platform: "LinkedIn Learning",
    url: `https://www.linkedin.com/learning/search?keywords=${encodeURIComponent(skill)}`,
    duration_hours: 10,
    level: "beginner"
  };
}
