// 用来配置或定义任务并加载Grunt插件
module.exports = function(grunt) {

    grunt.initConfig({
        jst: {
            bulid: {
                // files: [{
                //     expand: true,                   // 开启构建动态文件对象
                //     cwd: 'static/tpl/',             // 模板目录（源文件）
                //     src: ['**/*.html'],             // 能匹配到模板的二级目录
                //     dest: 'static/build/',          // 目标文件目录
                //     ext: '.js'                      // 目标文件的后缀名
                // }]
                files: { 'static/build/templates.js': ['static/tpl/**/*.html'] }
            },
            options: {                              // jst插件的一些配置
                amd: true,                          // define()的方法包裹生成的内容
                // namespace: false,                   // 直接返回模板函数(等价于_.template(tmpl))
                prettify: true,                     // 生成的内容在一行
                processName: function(path) {       // 处理路径
                    return path.slice(path.indexOf('tpl'));
                }
            }
        },
        watch: {
            files: ['static/tpl/**/*.html'],
            tasks: ['newer:jst:bulid']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask(['default'], ['jst']);
}