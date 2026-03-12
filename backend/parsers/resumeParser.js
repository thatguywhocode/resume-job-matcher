const fs = require("fs");
const pdfParse = require("pdf-parse");

const skillDatabase = require("../utils/skillDatabase");
const cleanText = require("../utils/textCleaner");
const { experiencePattern } = require("../utils/regexPatterns");

function flattenSkills(skillDatabase){
let allSkills = [];
for(let category in skillDatabase){
allSkills = allSkills.concat(skillDatabase[category]);
}

return allSkills;

}

function extractSkills(text){
const skills = flattenSkills(skillDatabase);
const foundSkills = [];
const lowerText = text.toLowerCase();

skills.forEach(skill => {
if(lowerText.includes(" " + skill + " ")){
foundSkills.push(skill);
}

});

return [...new Set(foundSkills)];

}

function extractExperience(text){

const regex = /(\d+(\.\d+)?)\+?\s*(years?|yrs?)\s*(of)?\s*(experience)?/gi;

const matches = [...text.matchAll(regex)];

if(matches.length === 0){
return 0;
}

let maxExp = 0;

matches.forEach(match => {

const num = parseFloat(match[1]);

if(num > maxExp){
maxExp = num;
}

});

return maxExp;

}


function extractName(text){

const lines = text.split("\n");

for(let line of lines){

line = line.trim();

if(line.length > 0){
return line;
}

}

return "Unknown";

}

async function parseResume(filePath){

const dataBuffer = fs.readFileSync(filePath);
const pdfData = await pdfParse(dataBuffer);
const rawText = pdfData.text;
const cleanedText = cleanText(rawText);
const name = extractName(rawText);
let experience = extractExperience(cleanedText);


const skills = extractSkills(cleanedText);

return {
name,
yearOfExperience: experience,
resumeSkills: skills
};

}

module.exports = parseResume;