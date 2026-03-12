import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {

const [resume,setResume] = useState(null);
const [jdText,setJdText] = useState("");
const [result,setResult] = useState(null);
const [animatedScore,setAnimatedScore] = useState(0);
const [history,setHistory] = useState([]);

useEffect(()=>{

const saved = localStorage.getItem("atsHistory");

if(saved){
setHistory(JSON.parse(saved));
}

},[]);

const cleanName = (name)=>{
if(!name) return "";
return name.replace(/name\s*:/i,"").trim();
};

const handleSubmit = async ()=>{

if(!resume){
toast.error("Please upload a resume first");
return;
}

if(!jdText.trim()){
toast.warning("Please paste the job description");
return;
}

const formData = new FormData();
formData.append("resume",resume);
formData.append("jdText",jdText);

try{

const response = await axios.post(
"http://localhost:5000/api/match",
formData
);

const data = response.data;

setResult(data);

const newHistory = [data,...history];

setHistory(newHistory);

localStorage.setItem("atsHistory",JSON.stringify(newHistory));

toast.success("Analysis complete!");

}catch(error){

console.error(error);
toast.error("Server error. Try again.");

}

};

const resetForm = ()=>{
setResume(null);
setJdText("");
setResult(null);
setAnimatedScore(0);
};

const clearHistory = ()=>{

localStorage.removeItem("atsHistory");
setHistory([]);

toast.info("History cleared");

};

const viewHistory = (item)=>{
setResult(item);
};

const job = result?.matchingJobs?.[0];

useEffect(()=>{

if(!job) return;

let start = 0;
const end = job.matchingScore;

const interval = setInterval(()=>{

start++;

setAnimatedScore(start);

if(start >= end){
clearInterval(interval);
}

},15);

return ()=>clearInterval(interval);

},[job]);

return(

<div className="background">

<div className="floating f1"></div>
<div className="floating f2"></div>
<div className="floating f3"></div>

<div className="page">

<div className="container">

<ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
theme="dark"
/>

<div className="hero">

<h1>Resume Job Match Analyzer</h1>

<p>
Upload your resume and compare it with a job description
to see how well it matches.
</p>

</div>

{/* UPLOAD CARD */}

<div className="card">

<h3>Upload Resume</h3>

<div
className="drop-area"
onClick={()=>document.getElementById("resumeUpload").click()}
onDragOver={(e)=>e.preventDefault()}
onDrop={(e)=>{
e.preventDefault();
const file = e.dataTransfer.files[0];
if(file){
setResume(file);
}
}}
>

<input
id="resumeUpload"
type="file"
accept=".pdf,.doc,.docx"
style={{display:"none"}}
onChange={(e)=>setResume(e.target.files[0])}
/>

<div className="upload-icon">☁️</div>

<p>
{resume
? resume.name
: <>Drag & Drop your resume or <span className="browse">Browse</span></>
}
</p>

</div>

<div className="upload-footer">

<span>Supported formats: PDF, DOC, DOCX</span>
<span>Max size: 25MB</span>

</div>

<textarea
placeholder="Paste job description..."
value={jdText}
onChange={(e)=>setJdText(e.target.value)}
></textarea>

<div className="buttons">

<button className="analyze" onClick={handleSubmit}>
Analyze
</button>

<button className="reset" onClick={resetForm}>
Reset
</button>

</div>

</div>

{/* RESULT SECTION */}

{result && job && (

<div className="result-card">

{/* LEFT PANEL */}

<div className="result-left">

<div className="score-wrapper">

<div
className="score-ring"
style={{ "--score": animatedScore }}
>

<div className="score-inner">
{animatedScore}%
</div>

</div>

<p className="score-label">Match Score</p>

</div>

<h2>{cleanName(result.name)}</h2>

<p><b>Role:</b> {job.role}</p>

<p><b>Experience:</b> {result.yearOfExperience} years</p>

<p><b>Salary:</b> {result.salary}</p>

</div>

{/* RIGHT PANEL */}

<div className="result-right">

<h3>Resume Skills</h3>

<div className="skills">

{result.resumeSkills.map((s,i)=>(
<span key={i} className="skill">{s}</span>
))}

</div>

<h3>Skill Analysis</h3>

<div className="skill-analysis">

{job.skillsAnalysis.map((s,i)=>(

<div key={i} className="skill-row">

<span>{s.skill}</span>

<span className={s.presentInResume ? "match":"missing"}>
{s.presentInResume ? "Matched":"Missing"}
</span>

</div>

))}

</div>

</div>

</div>

)}

{/* HISTORY PANEL */}

{history.length > 0 && (

<div className="history-card">

<div className="history-header">

<h3>Previous Analyses</h3>

<button className="clear-history" onClick={clearHistory}>
Clear
</button>

</div>

{history.map((item,index)=>{

const hJob = item.matchingJobs?.[0];

return(

<div
key={index}
className="history-item"
onClick={()=>viewHistory(item)}
>

<span>{cleanName(item.name)}</span>

<span>{hJob?.matchingScore}%</span>

</div>

);

})}

</div>

)}

</div>
</div>
</div>

);

}

export default App;