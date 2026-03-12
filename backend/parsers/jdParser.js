const skillDatabase = require("../utils/skillDatabase");
const cleanText = require("../utils/textCleaner");
const { salaryPattern, experiencePattern } = require("../utils/regexPatterns");

function flattenSkills(skillDatabase) {

let allSkills = [];

for (let category in skillDatabase) {
allSkills = allSkills.concat(skillDatabase[category]);
}

return allSkills;

}

function extractJDSkills(text){

const allSkills = flattenSkills(skillDatabase);
const foundSkills = [];
const lowerText = text.toLowerCase();

allSkills.forEach(skill => {

const regex = new RegExp("\\b" + skill + "\\b","i");

if(regex.test(lowerText)){
foundSkills.push(skill);
}

});

return [...new Set(foundSkills)];
}

function extractSalary(text) {

const match = text.match(salaryPattern);

if (match) {
return match[0];
}

return "Not specified";

}

function extractJDExperience(text) {

const match = text.match(experiencePattern);

if (match) {
return parseFloat(match[1]);
}

return 0;

}

function extractRole(text) {

const roleRegex = /(senior software engineer|software engineer|backend developer|backend engineer|frontend developer|frontend engineer|full stack engineer|full stack developer|data scientist|developer|engineer)/i;

const match = text.match(roleRegex);

if (match) {
return match[0];
}

return "Software Engineer";

}

function extractSummary(text) {

const paragraphs = text.split("\n\n");

if(paragraphs.length === 0){
return text.slice(0,400);
}

return paragraphs[0].trim().slice(0,400);

}

function parseJD(jdText) {

const cleanedText = cleanText(jdText);

const salary = extractSalary(jdText);

const experience = extractJDExperience(cleanedText);

const skills = extractJDSkills(cleanedText);

const role = extractRole(jdText);

const summary = extractSummary(jdText);

return {
role: role,
salary: salary,
requiredExperience: experience,
jdSkills: skills,
aboutRole: summary
};

}

module.exports = parseJD;