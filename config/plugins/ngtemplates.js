module.exports = function(lineman) {
  return {
    config: {
      loadNpmTasks: lineman.config.application.loadNpmTasks.concat("grunt-angular-templates"),
      prependTasks: {
        common: lineman.config.application.prependTasks.common.concat("ngtemplates")
      },
      ngtemplates: {
        app: {
          cwd: "src/app",
          src: "**/*.tpl.html",
          dest: "<%= files.ngtemplates.dest %>"
        }
      },
      watch: {
        ngtemplates: {
          files: "src/app/**/*.tpl.html",
          tasks: ["ngtemplates"]
        }
      }
    },
    files: {
      ngtemplates: {
        dest: "build/js/template-cache.js"
      }
    }
  };
};