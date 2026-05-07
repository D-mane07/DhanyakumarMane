const portfolioData = {
    personalInfo: {
        name: "Dhanyakumar Mane",
        role: "Data Analyst | Business Intelligence & Data Analytics",
        contact: `
            <a href="tel:+917066674104" class="contact-link" style="color: black; text-decoration: underline;">+91 7066674104</a> • 
            <a href="mailto:dhanyakumarmane.ai@gmail.com" class="contact-link" style="color: black; text-decoration: underline;">dhanyakumarmane.ai@gmail.com</a> • 
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="contact-link" style="color: black; text-decoration: underline;">LinkedIn</a> • 
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="contact-link" style="color: black; text-decoration: underline;">GitHub</a>
            <br>Panvel, Navi Mumbai, India
        `
    },

    about: `Analytical and detail-oriented Engineering student with professional experience in software deployment and a strong background in Data Science. 
    <br><br>
    Ranked as a top Kaggle contributor in India, I specialize in transforming raw data into actionable business intelligence using Power BI, SQL, and Python. Proven track record in reducing process setup times and building high-accuracy predictive models to solve complex business challenges.`,

    education: `<strong>Pillai HOC College of Engineering & Technology</strong> (2023 – 2026)<br>
    Bachelor of Engineering – Electronics & Computer Science<br>
    Navi Mumbai, India<br><br>
    <strong>Pillai HOC Polytechnic College</strong> (2019 – 2022)<br>
    Diploma – Electronics & Telecommunication Engineering<br>
    Navi Mumbai, India`,

    location: [
        { icon: "🏠", text: "Panvel, Navi Mumbai" },
        { icon: "🇮🇳", text: "India" },
        { icon: "💼", text: "Open to Data Analyst & BI roles" },
        { icon: "🏆", text: "#1 Kaggle Dataset Contributor (India)" }
    ],

    skills: [
        { icon: "📊", name: "Data Analytics & BI", hover: { usage: "Power BI, Excel (Advanced), DAX, KPI Development, Data Modeling, and Dashboard Reporting." }},
        { icon: "🗄️", name: "Programming & Databases", hover: { usage: "Python, SQL (MySQL), MongoDB, ETL Pipelines, and Query Optimization." }},
        { icon: "🧪", name: "Libraries", hover: { usage: "Pandas, NumPy, Scikit-learn, Matplotlib, and Seaborn for statistical analysis." }},
        { icon: "⚙️", name: "Core Competencies", hover: { usage: "EDA, Trend Forecasting, Cause Analysis, and Data-Driven Decision Making." }},
        { icon: "🛠️", name: "Tools & Version Control", hover: { usage: "Git, GitHub, VSCode, Jupyter Notebook, and Google Sheets." }},
        { icon: "📜", name: "Certifications", hover: { usage: "Data Analytics (Deloitte), Python Programming (IBM), and Data Science (Oracle)." }}
    ],

    experience: [
        {
            title: "💻 Software Technician | IdeaForge Technology Ltd.",
            date: "Sept 2022 – Nov 2023",
            description: [
                "Supported deployment and calibration of UAV communication software, achieving 90% performance ratings.",
                "Analyzed 150+ software calibration cycles to identify failure patterns, reducing setup time by 25%.",
                "Created deployment and performance summaries with Excel to enable data-driven decision-making.",
                "Collaborated with cross-functional stakeholders to improve process efficiency using performance metrics."
            ]
        }
    ],

    projects: [
        { 
            emoji: "🛒", 
            name: "Blinkit Sales & Operations Analytics", 
            desc: "SQL & Power BI dashboard for revenue and inventory tracking.",
            url: "https://github.com",
            hover: {
                description: "Cleaned 10,000+ records and used A/B testing on product segmentation, reducing profitability misclassification by 18%.",
                skills: ["SQL", "Power BI", "DAX", "A/B Testing"]
            }
        },
        { 
            emoji: "📈", 
            name: "E-commerce Performance Analysis", 
            desc: "End-to-end cleaning and EDA pipeline for sales drivers.",
            url: "https://github.com",
            hover: {
                description: "Applied statistical analysis on 5,000+ records to surface seasonal trends using Python (Pandas, Seaborn).",
                skills: ["Python", "EDA", "Matplotlib", "Data Wrangling"]
            }
        },
        { 
            emoji: "👥", 
            name: "HR Analytics – Attrition Prediction", 
            desc: "Predictive ML model for identifying at-risk employees.",
            url: "https://github.com",
            hover: {
                description: "Developed a Random Forest model with 84% accuracy and automated reporting, reducing manual effort by 40%.",
                skills: ["Scikit-learn", "Machine Learning", "Tableau", "Feature Engineering"]
            }
        }
    ]
};
