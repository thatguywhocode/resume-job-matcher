function cleanText(text){

return text
.toLowerCase()
.replace(/c\+\+/g,"cpp")
.replace(/c#/g,"csharp")
.replace(/node\.js/g,"node js")
.replace(/[^a-z0-9\s]/g," ")
.replace(/\s+/g," ")
.trim();

}

module.exports = cleanText;