/*
Task: spec
Description: run specs
Dependencies: grunt
Contributor: @searls
*/

module.exports = function(grunt) {
  var fork, path, testemRunnerPath;
  path = require("path");
  fork = require("child_process").fork;
  testemRunnerPath = require("node_modules/lineman/lib/testem-utils").testemRunnerPath;
  return grunt.registerTask("spec", "run specs", function(target) {
    var args, child, done, e;
    try {
      done = this.async();
      args = ["-f", path.resolve("" + (process.cwd()) + "/config/spec.json")];
      if (this.options().growl) {
        args.push("-g");
      }
      child = fork(testemRunnerPath(false), args);
      return child.on("exit", function(code, signal) {
        if (code !== 0) {
          grunt.warn("Spec execution failed with exit code " + code);
        }
        return done();
      });
    } catch (_error) {
      e = _error;
      grunt.fatal(e);
      throw e;
    }
  });
};