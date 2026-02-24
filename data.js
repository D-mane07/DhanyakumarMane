const portfolioData = {
    personalInfo: {
        name: "Dhanyakumar Mane",
        role: "Data Analyst | Business Intelligence & Data Analytics",
        contact: `
            <a href="tel:+917066674104" class="contact-link" style="color: black; text-decoration: underline;">+91 7066674104</a> • 
            <a href="mailto:dhanyakumarmane.ai@gmail.com" class="contact-link" style="color: black; text-decoration: underline;">dhanyakumarmane.ai@gmail.com</a> • 
            <a href="https://linkedin.com/in/dhanyakumar" target="_blank" rel="noopener noreferrer" class="contact-link" style="color: black; text-decoration: underline;">LinkedIn</a> • 
            <a href="https://github.com/dhanyakumar" target="_blank" rel="noopener noreferrer" class="contact-link" style="color: black; text-decoration: underline;">GitHub</a>
            <br>Panvel, Navi Mumbai, India
        `
    },

    about: `Detail-oriented engineering graduate with hands-on experience in software deployment and project-based experience 
    in data analysis and business analysis through academic projects.
    <br><br>
    Proficient in Python, SQL, Power BI, and data visualization with strong capability in KPI tracking, data modeling, and generating actionable insights to support data-driven decision-making. Ready to deliver accurate reporting and measurable business value in a data analyst role.`,

    education: `<strong>Pillai HOC College of Engineering & Technology</strong> (2023 – 2026)<br>
    Bachelor of Electronics & Computer Science Engineering<br>
    <strong>CGPA:</strong> 7.86 / 10<br>
    Navi Mumbai, India<br><br>
    <strong>Pillai HOC Polytechnic College</strong> (2019 – 2022)<br>
    Diploma in Electronics & Telecommunication Engineering<br>
    <strong>Percentage:</strong> 74.00%<br>
    Navi Mumbai, India`,

    location: [
        { icon: "🏠", text: "Panvel, Navi Mumbai" },
        { icon: "🇮🇳", text: "India" },
        { icon: "💼", text: "Open to Data Analyst & BI roles" },
        { icon: "✈️", text: "Available for relocation & remote work" }
    ],

    skills: [
        { icon: "📊", name: "Power BI & Tableau", hover: { usage: "Built KPI-driven dashboards and business intelligence reports for operational decision-making." }},
        { icon: "📈", name: "Excel & DAX", hover: { usage: "Advanced Excel analysis, pivot tables, KPI tracking, and DAX-based calculations." }},
        { icon: "🐍", name: "Python", hover: { usage: "Data cleaning, preprocessing, and analysis using Pandas, NumPy, and Scikit-learn." }},
        { icon: "🗄️", name: "SQL & Databases", hover: { usage: "Data querying, joins, aggregation, and performance analysis using MySQL and MongoDB." }},
        { icon: "📉", name: "Data Modeling & Visualization", hover: { usage: "Designed structured data models and interactive dashboards for actionable insights." }},
        { icon: "🛠️", name: "Tools & Version Control", hover: { usage: "Worked with VSCode, Git, GitHub, MS Office, and LaTeX for documentation and collaboration." }},
        { icon: "🤝", name: "Professional Skills", hover: { usage: "Analytical thinking, stakeholder communication, collaboration, and time management." }}
    ],

    experience: [
        {
            title: "💻 Software Technician | IdeaForge Technology Ltd.",
            date: "Sept 2022 – Nov 2023",
            description: [
                "Supported deployment and calibration of UAV communication software across production and field environments achieving 90% performance ratings.",
                "Created deployment and performance summaries using Excel to support data-driven decisions.",
                "Analyzed deployment data from 150+ calibration cycles to identify failure patterns and standardize processes reducing setup time by 25%.",
                "Collaborated with cross-functional stakeholders to improve operational efficiency using performance metrics."
            ]
        }
    ],

    projects: [
        { 
            emoji: "🛒", 
            name: "Blinkit Sales & Operations Analytics Dashboard", 
            desc: "Sales and KPI performance analysis using SQL & Power BI.",
            url: "https://github.com/dhanyakumar",
            hover: {
                description: "Analyzed 10,000+ sales records using SQL and Power BI to identify underperforming product categories and improve revenue and outlet efficiency tracking.",
                skills: ["SQL", "Power BI", "Data Modeling", "KPI Development", "Data Visualization"]
            }
        },
        { 
            emoji: "📦", 
            name: "E-commerce Data Analysis Dashboard", 
            desc: "Excel-based sales and customer insights dashboard.",
            url: "https://github.com/dhanyakumar",
            hover: {
                description: "Performed analysis on 5,000+ sales and customer records using Excel to identify trends and performance gaps and generate actionable insights.",
                skills: ["Excel", "Data Visualization", "Reporting", "Trend Analysis"]
            }
        }
    ],

    achievements: [
        { icon: "📄", text: "Published research paper in Artificial Intelligence domain." },
        { icon: "📊", text: "Contributed multiple datasets to Kaggle for public data analysis use." }
    ],

    certificates: [
        "Data Analytics – Deloitte",
        "Python Programming – IBM",
        "Data Science – Oracle"
    ],

    languages: ["Marathi", "Hindi", "English"],

    summary: `Data Analyst skilled in SQL, Python, Power BI, and Excel with experience in KPI development, dashboard creation, 
    and business performance analysis. Experienced in analyzing large datasets, generating reports, and supporting 
    data-driven strategic decisions.`,

    config: {
        emojiChangeInterval: 2000,
        githubContributionDays: 365,
        scrollAnimationDuration: 30
    }
};

// Export for Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioData;
}
if (typeof window !== 'undefined') {
    window.portfolioData = portfolioData;
}
