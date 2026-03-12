# Resume Job Match Analyzer

A resume vs job description analysis web application built using React and Node.js.
The system parses resumes and job descriptions using rule-based logic and calculates an ATS-style matching score based on skill overlap.
It demonstrates resume parsing, regex-based information extraction, skill mapping, and scoring logic without using large language models.

---

## 🚀 Features

- 📄 Resume Upload (PDF support)
- 🧠 Rule-based Resume Parsing
- 📑 Job Description Analysis
- 🔍 Skill Extraction from Resume & JD
- 📊 ATS Match Score Calculation
- 🧾 Skill Comparison (Matched / Missing)
- 📜 Search History with Previous Results


## 🛠 Tech Stack

- React
- Axios
- CSS 
- Node.js
- Express.js
- pdf-parse

---

## 📦 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/thatguywhocode/resume-job-match-analyzer.git
cd resume-job-match-analyzer
```


## 2️⃣ Install Dependencies

```bash
cd backend
npm install
```


## 3️⃣ Start Backend Server

```bash
node server.js
```

Server will run at:

```
http://localhost:5000
```


## 4️⃣ Install Frontend Dependencies

```bash
cd ../frontend
npm install
```


## 5️⃣ Run Frontend

```bash
npm run dev
```

App will run at:

```
http://localhost:5173
```
---

## Example Output

```bash
{
  "name": "John Doe",
  "salary": "12 LPA",
  "yearOfExperience": 4.5,
  "resumeSkills": ["Java", "Spring Boot"],
  "matchingJobs": [
    {
      "jobId": "JD001",
      "role": "Backend Developer",
      "aboutRole": "Responsible for backend development and building scalable APIs.",
      "skillsAnalysis": [
        { "skill": "Java", "presentInResume": true },
        { "skill": "Kafka", "presentInResume": false }
      ],
      "matchingScore": 50
    }
  ]
}

```

