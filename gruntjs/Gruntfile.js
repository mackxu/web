module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jst: {
      compile: {
        options: {
          amd: true,
          prettify: true
        },
        files: [{
          expand: true,         // Enable dynamic expansion.
          cwd: 'tpl/',          // Src matches are relative to this path.
          src: ['**/*.html'],   // Actual pattern(s) to match.
          dest: 'dest/',        // Destination path prefix.
          ext: '.js'            // Dest filepaths will have this extension.
        },
      ],
      }
    },
    watch: {
      script: {
        files: ['tpl/**/*.html'],
        tasks: ['jst'],
        options: {
          livereload: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'jst', 'watch']);

};