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
        tasks: ['less:dist', 'cssmin'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less:dist', 'cssmin', 'watch']);

}
