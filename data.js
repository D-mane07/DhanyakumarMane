const portfolioData = {
    personalInfo: {
        name: "Dhanyakumar Mane",
        role: "AI Engineer | Data Science & Machine Learning",
        contact: `
            <a href="tel:+917066674104" class="contact-link" style="color: black; text-decoration: underline;">+91-7066674104</a> • 
            <a href="mailto:dhanyakumarmane104@gmail.com" class="contact-link" style="color: black; text-decoration: underline;">dhanyakumarmane104@gmail.com</a> • 
            <a href="https://www.linkedin.com/in/dhanyakumar-mane" target="_blank" rel="noopener noreferrer" class="contact-link" style="color: black; text-decoration: underline;">LinkedIn</a> • 
            <a href="https://github.com/D-mane07" target="_blank" rel="noopener noreferrer" class="contact-link" style="color: black; text-decoration: underline;">GitHub</a>
            <br>Panvel, Navi Mumbai, Maharashtra, India
        `
    },

    about: `AI Engineer and Data Science professional with hands-on experience in Deep Learning, NLP, and Computer Vision.
    <br><br>
    Passionate about creating real-world AI solutions, model optimization, and scalable ML pipelines. Experienced with voice cloning, recommendation systems, fraud detection, and blockchain analytics.`,

    education: `<strong>Pillai HOC College of Engineering & Technology</strong> (2023 - 2026)<br>
    Bachelor of Engineering in Electronics & Computer Science<br>
    <strong>CGPA:</strong> 6.0<br><br>
    <strong>Pillai HOC Polytechnic</strong> (2019 - 2022)<br>
    Diploma in Electronics & Telecommunication Engineering<br>
    <strong>Percentage:</strong> 74%`,

    location: [
        { icon: "🏠", text: "Panvel, Navi Mumbai" },
        { icon: "🇮🇳", text: "India" },
        { icon: "💼", text: "Open to AI/ML roles & internships" },
        { icon: "✈️", text: "Available for relocation & remote work" }
    ],

    skills: [
        { icon: "🐍", name: "Python", hover: { usage: "Proficient in Python for AI/ML, data processing, and automation." }},
        { icon: "🧠", name: "Machine Learning", hover: { usage: "Experience with supervised, unsupervised learning, and ensemble models." }},
        { icon: "🤖", name: "Deep Learning", hover: { usage: "Built CNN, RNN, and Transformer models using TensorFlow and Keras." }},
        { icon: "💬", name: "Natural Language Processing", hover: { usage: "Worked with spaCy, Gensim, and text classification for NLP tasks." }},
        { icon: "🖼️", name: "Computer Vision", hover: { usage: "Applied OpenCV and CNNs for real-world image AI projects." }},
        { icon: "🧩", name: "Flask / FastAPI", hover: { usage: "Developed and deployed ML models via REST APIs." }},
        { icon: "☁️", name: "AWS", hover: { usage: "Basic experience with EC2, S3, and cloud model deployment." }},
        { icon: "🗄️", name: "Databases", hover: { usage: "Hands-on with MongoDB, MySQL, and PostgreSQL." }},
        { icon: "📊", name: "Data Visualization", hover: { usage: "Created dashboards using Power BI, Matplotlib, and Seaborn." }},
        { icon: "📦", name: "Version Control", hover: { usage: "Used Git and GitHub for project collaboration and version management." }}
    ],

    experience: [
        {
            title: "💻 Data Science Python Research Intern | MEGAMINDS IT SERVICES",
            date: "Sept 2025 – Present",
            description: [
                "Working on research-oriented AI projects involving NLP and data modeling.",
                "Designing scalable data pipelines and ML model deployment using FastAPI."
            ]
        },
        {
            title: "🛰️ Software Technician | IdeaForge Technology Ltd.",
            date: "Sept 2022 – Nov 2023",
            description: [
                "Installed and configured UAV communication software with 90% performance accuracy.",
                "Optimized calibration workflows improving reliability by 100% during field operations.",
                "Automated diagnostic scripts reducing setup time by 25%."
            ]
        }
    ],

    projects: [
        { 
            emoji: "🔗", 
            name: "Blockchain Wallet Transaction Analyzer", 
            desc: "Monitor wallets & analyze crypto flows using Python.",
            url: "https://github.com/D-mane07",
            hover: {
                description: "Developed a blockchain analytics tool to monitor and visualize wallet transactions, detect anomalies, and analyze token flow trends using Python APIs and data visualization.",
                skills: ["Python", "Pandas", "Blockchain API", "Matplotlib", "Data Visualization"]
            }
        },
        { 
            emoji: "🎬", 
            name: "Movie Genre Classification", 
            desc: "ML model to classify movie genres.",
            url: "https://github.com/D-mane07",
            hover: {
                description: "Built a machine learning model to classify movies into genres based on synopsis and metadata using NLP and scikit-learn.",
                skills: ["Python", "Scikit-learn", "NLP", "TF-IDF", "Pandas"]
            }
        },
        { 
            emoji: "🚢", 
            name: "Titanic Survival Prediction", 
            desc: "Classic Kaggle ML Project.",
            url: "https://github.com/D-mane07",
            hover: {
                description: "Implemented a predictive model to determine Titanic passenger survival probability using feature engineering and classification algorithms.",
                skills: ["Python", "Pandas", "Scikit-learn", "Logistic Regression", "EDA"]
            }
        },
        { 
            emoji: "🎙️", 
            name: "Retrieval Voice Cloning", 
            desc: "Speech Synthesis AI",
            url: "https://github.com/D-mane07",
            hover: {
                description: "Created Tacotron2 + WaveGlow based model for real-time voice cloning with minimal audio input achieving a 4.1/5 MOS score.",
                skills: ["Python", "PyTorch", "Tacotron2", "WaveGlow", "Audio Processing"]
            }
        },
        { 
            emoji: "🎌", 
            name: "Anime Recommendation System", 
            desc: "Personalized Recommender Engine",
            url: "https://github.com/D-mane07",
            hover: {
                description: "Built a machine learning-based anime recommendation system leveraging user ratings and preferences with Flask web integration.",
                skills: ["Python", "Scikit-learn", "Flask", "Pandas", "HTML", "CSS", "JavaScript"]
            }
        },
        { 
            emoji: "🛡️", 
            name: "Accredian FraudShield Model", 
            desc: "Fraud detection using ML.",
            url: "https://github.com/D-mane07",
            hover: {
                description: "Developed a fraud detection model using anomaly detection, classification algorithms, and SMOTE balancing to identify suspicious activities.",
                skills: ["Python", "Scikit-learn", "Random Forest", "Data Balancing", "EDA"]
            }
        },
        { 
            emoji: "🛒", 
            name: "ThinkStore", 
            desc: "E-commerce Prototype",
            url: "https://github.com/D-mane07",
            hover: {
                description: "Developed an end-to-end e-commerce web prototype featuring product listings, cart management, and payment simulation.",
                skills: ["Python", "Flask", "HTML", "CSS", "SQLite"]
            }
        }
    ],

    achievements: [
        { icon: "📄", text: "Published Research Paper on Artificial Intelligence Context" },
        { icon: "🥇", text: "#1 Kaggle Dataset (India)" },
        { icon: "🎓", text: "Oracle Data Science Professional Certificate" },
        { icon: "📚", text: "IBM Python Course Certificate" }
    ],

    certificates: [
        "Oracle Data Science Professional Certificate",
        "Python for Data Science – IBM",
        "Deep Learning Specialization (Coursera)"
    ],

    languages: ["English", "Hindi", "Marathi"],

    summary: `AI Engineer skilled in building and deploying ML solutions using Python, TensorFlow, and NLP libraries. 
    Experienced with real-time model inference, data preprocessing, blockchain analytics, and cloud deployment. Passionate about applied AI and solving real-world problems.`,

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
