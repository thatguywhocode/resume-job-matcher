import { useState } from "react";
import axios from "axios";
import "../styles/ResumeMatcher.css";

function ResumeMatcher(){

const [resume,setResume] = useState(null);
const [jdText,setJdText] = useState("");
const [result,setResult] = useState(null);
const [history,setHistory] = useState([]);

const cleanName = (name)=>{
if(!name) return "";
return name.replace(/name\s*:/i,"").trim();
};

const handleSubmit = async () => {

const formData = new FormData();
formData.append("resume",resume);
formData.append("jdText",jdText);

try{

const res = await axios.post(
"http://localhost:5000/api/match",
formData
);

setResult(res.data);
setHistory(prev => [res.data,...prev]);

}catch(err){
console.error(err);
}

};

const reset = ()=>{
setResume(null);
setJdText("");
setResult(null);
};

const job = result?.matchingJobs?.[0];

return(

<div className="wrapper">

<header className="header">
<h1>Resume ↔ Job Match Analyzer</h1>
</header>

<div className="input-panel">

<input
type="file"
onChange={(e)=>setResume(e.target.files[0])}
/>

<textarea
placeholder="Paste job description here..."
value={jdText}
onChange={(e)=>setJdText(e.target.value)}
/>

<div className="actions">

<button onClick={handleSubmit}>Analyze</button>

<button className="secondary" onClick={reset}>
Reset
</button>

</div>

</div>

{result && job && (

<div className="results">

<div className="candidate">

<h2>{cleanName(result.name)}</h2>

<p><strong>Role:</strong> {job.role}</p>

<p><strong>Experience:</strong> {result.yearOfExperience} years</p>

<p><strong>Salary:</strong> {result.salary}</p>

</div>

<div className="score-block">

<p>Match Score</p>

<div className="progress">

<div
className="bar"
style={{width: job.matchingScore + "%"}}
></div>

</div>

<span>{job.matchingScore}%</span>

</div>

<div className="skills">

<h3>Resume Skills</h3>

<div className="tags">

{result.resumeSkills.map((s,i)=>(
<span key={i} className="tag">{s}</span>
))}

</div>

</div>

<div className="analysis">

<h3>Skill Comparison</h3>

<table>

<thead>
<tr>
<th>Skill</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{job.skillsAnalysis.map((s,i)=>(
<tr key={i}>
<td>{s.skill}</td>
<td className={s.presentInResume ? "good":"bad"}>
{s.presentInResume ? "✓":"✗"}
</td>
</tr>
))}

</tbody>

</table>

</div>

</div>

)}

{history.length > 0 && (

<div className="history">

<h3>Recent Analyses</h3>

{history.map((h,i)=>{

const j = h?.matchingJobs?.[0];

return(
<div key={i} className="history-item">
{cleanName(h.name)} — {j?.matchingScore ?? 0}%
</div>
);

})}

</div>

)}

</div>

);

}

export default ResumeMatcher;