module.exports = function(grunt) {
  var path, spawn;
  path = require("path");
  spawn = require("child_process").spawn;
  return grunt.registerTask("e2e", "run specs in ci mode", function(target) {
    var done;
    process.argv = ["doesnt", "matter", "" + (process.cwd()) + "/config/e2e.js"];
    done = this.async();
    return require("" + (process.cwd()) + "/node_modules/protractor/lib/cli");
  });
};