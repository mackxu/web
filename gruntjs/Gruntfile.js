module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        useminPrepare: {
            html: ['app/tpl/**/*.html'],
            options: {
                // 测试发现这里指定的dest，是usemin引入资源的相对路径的开始
                // 在usemin中设置assetsDirs，不是指定的相对路径
                // List of directories where we should start to look for revved version of the assets referenced in the currently looked at file
                dest: 'build/tpl'               // string type                 
            }
        },
        usemin: { 
            html: ['build/tpl/**/*.html'],      // 注意此处是build/
            options: {
                assetsDirs: ['build/js']
            }
        },
        copy: {
            html: {
                expand: true,                   // 需要该参数
                cwd: 'app/',
                src: ['tpl/**/*.html'],         // 会把tpl文件夹+文件复制过去
                dest: 'build'
            }
        },
        less: {
            src: ['app/less/**'],
            dest: 'build/script/app.css'
        },
        jshint: {
            options: {
                curly: true,
                undef: true,
                browser: true,
                unused: true,
                strict: true,
                node: true,
                devel: true,
                jquery: true            // 不要写成jQuery了吆
            },
            src: ['app/js/**/*.js']
        } 

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // 最后就是顺序了，没错concat,uglify在这里哦！
    grunt.registerTask('default', [
        'copy:html',
        'useminPrepare',
        'concat:generated',
        'uglify:generated',
        'usemin'
    ]);

};