var fs;

fs = require("fs");

module.exports = {
    testemRunnerPath: function(bin) {
        var extension, linemanPath, localPath, testemPath;
        if (bin == null) {
            bin = true;
        }

        testemPath = bin ? "node_modules/.bin/testem" : "node_modules/testem/testem.js";
        extension = bin && require('os').platform() === "win32" ? ".cmd" : "";
        localPath = "" + (process.cwd()) + "/" + testemPath + extension;
        linemanPath = "" + (process.cwd()) + "/node_modules/lineman/" + testemPath + extension;

        if (fs.existsSync(localPath)) {
            return localPath;
        } else if (fs.existsSync(linemanPath)) {
            return linemanPath;
        } else {
            throw "Testem runner wasn't found! Make sure it is installed locally to your project or under `node_modules/lineman`";
        }
    }
};