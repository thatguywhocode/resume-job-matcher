const express = require("express");
const router = express.Router();
const upload = require("../utils/uploadConfig");
const parseResume = require("../parsers/resumeParser");
const parseJD = require("../parsers/jdParser");
const { buildFinalResponse } = require("../matcher/matchEngine");

router.post("/match", upload.single("resume"), async (req, res) => {

try {

if(!req.file){
return res.status(400).json({
error:"Resume file is required"
});
}

const resumePath = req.file.path;
const jdText = req.body.jdText;

if(!jdText){
return res.status(400).json({
error:"Job description is required"
});
}

const resumeData = await parseResume(resumePath);
const jdData = parseJD(jdText);
const result = buildFinalResponse(resumeData, jdData);

res.json(result);

}
catch(error){

console.error(error);

res.status(500).json({
error:"Error processing request"
});
}
});

module.exports = router;