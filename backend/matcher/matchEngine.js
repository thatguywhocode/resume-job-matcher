function analyzeSkills(jdSkills, resumeSkills){

const analysis = [];

jdSkills.forEach(skill => {

analysis.push({
skill: skill,
presentInResume: resumeSkills
.map(s => s.toLowerCase())
.includes(skill.toLowerCase())
});

});

return analysis;

}

function calculateMatchingScore(jdSkills, resumeSkills){

let matched = 0;

jdSkills.forEach(skill => {

if(resumeSkills
.map(s => s.toLowerCase())
.includes(skill.toLowerCase())){
matched++;
}

});

if(jdSkills.length === 0){
return 0;
}

return Math.round((matched / jdSkills.length) * 100);

}

function generateMatchResult(resumeData, jdData){

const skillsAnalysis = analyzeSkills(
jdData.jdSkills,
resumeData.resumeSkills
);

const score = calculateMatchingScore(
jdData.jdSkills,
resumeData.resumeSkills
);

return {
jobId: "JD001",
role: jdData.role,
aboutRole: jdData.aboutRole,
skillsAnalysis: skillsAnalysis,
matchingScore: score
};

}

function buildFinalResponse(resumeData, jdData){

const matchResult = generateMatchResult(resumeData, jdData);

return {
name: resumeData.name,
salary: jdData.salary,
yearOfExperience: resumeData.yearOfExperience,
resumeSkills: resumeData.resumeSkills,
matchingJobs: [matchResult]
};

}

module.exports = {
buildFinalResponse
};