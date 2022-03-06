const fs = require("fs");
const path = require("path");

const lovejs = path.resolve("love.js");

function globalizeFS(sourceCode)
{
    const isGlobalizedChecker = "window.FS = null;";
    if(sourceCode.substring(0, isGlobalizedChecker.length) == isGlobalizedChecker)
    {
        console.log("love.js FS globalization is up to date");
        return sourceCode;
    }

    var syscallsIndex = sourceCode.indexOf("var SYSCALLS");
    return "window.FS = null;"  + sourceCode.substring(0, syscallsIndex) +
        "if(window.FS == null)window.FS = FS;" + sourceCode.substring(syscallsIndex);
}


if(fs.existsSync(lovejs))
{
    const source = String(fs.readFileSync(lovejs));
    if(source == null)
        throw new Error("Error occurred while reading file " + lovejs);
    fs.writeFileSync(lovejs, globalizeFS(source));
}
else
    throw new Error("File love.js not found");