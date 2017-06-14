module.exports = function(grunt) {

  grunt.initConfig({
    less: {
      dist: {
        options: {
          plugins: [
            
          ],
          modifyVars: {}
        },
        files: {
          "css/own/styles.css": "less/styles.less"
        },
      },
    },
    clean: ["less/styles.less"],
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/own/styles.css': ['css/own/styles.css']
        }
      }
    },
    watch: {
      less: {
        files: ['less/**/*.less'],
        tasks: ['less:dist'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less', 'clean', 'watch']);

}
