var gulp         = require('gulp'),
    changed      = require('gulp-changed'),
    rename       = require('gulp-rename'),
    babel        = require('gulp-babel'),
    sass         = require('gulp-sass'),
    cssmin       = require('gulp-clean-css'),				//压缩css
    autoprefixer = require('gulp-autoprefixer'),		//添加浏览器前缀
    clean        = require('gulp-clean'),						//清理文目标文件夹
    csso         = require('gulp-csso'),						//合并css属性
    csslint      = require('gulp-csslint'),					//css语法检查
    csscomb      = require('gulp-csscomb'),					//css 样式表的各属性的顺序
    cache        = require('gulp-cache')
    ;

var target = 'D:/apache-tomcat-8.0.43/webapps/mkh1.0/system/';

var srcFile     = 'D:/workspace/mkh1.0/WebRoot/system/',
    srcFileView = srcFile+'view/**/*.html',
    srcFileJs   = srcFile+'view/**/js/*.js',
    srcFileJs2  = srcFile+'view/**/js2/*.js',
    srcFileCss  = srcFile+'view/**/css/*.css',
    srcFileSass = srcFile+'view/**/sass/*.scss',
    srcFileImg  = srcFile+'view/**/css/images/*.{jpg,png}'
	;

/*由于外部编辑器修改后，需要七八秒eclipse才能监听到文件，因此直接复制文件到eclipse发布的目录*/

// html
gulp.task('copyViews', function() {
    gulp.src(srcFileView)
      .pipe(changed(target+'view'))
      .pipe(gulp.dest(target+'view'));

});
// es6
/* presets-es2015 需要在全局安装不然无法编译 */
gulp.task('compileEs6', function() {
    gulp.src(srcFileJs2)
      .pipe(changed(target+'view'))
      .pipe(babel({
        presets: ['es2015']g
      }))
      .pipe(rename(function (path) {
        path.dirname = path.dirname.replace('js2', 'js')
      }))
      .pipe(gulp.dest(srcFile+'view'));
});
// js
gulp.task('copyJs', function() {
    gulp.src(srcFileJs)
      .pipe(changed(srcFileJs))
      .pipe(gulp.dest(target+'view'));

});
// css
gulp.task('copyCss', function() {
    gulp.src(srcFileCss)
      .pipe(changed(srcFileCss))
      .pipe(gulp.dest(target+'css'));

});
// img
gulp.task('copyImg', function() {
    gulp.src(srcFileImg)
      .pipe(changed(srcFileImg))
      .pipe(gulp.dest(target+'css/img'));

});
// sass
gulp.task('sassCommon',function () {      
    gulp.src(srcFileSass)
      .pipe(sass()).on('error', sass.logError)
      .pipe(cssmin())
      .pipe(autoprefixer())
      .pipe(csso())
      // .pipe(csslint())
      .pipe(rename(function (path) {
        path.dirname = path.dirname.replace('sass', 'css')
        console.log(path);
      }))
      .pipe(gulp.dest(srcFile+'view'))
});

gulp.task("autowatch",function(){
	gulp.watch([srcFileView],['copyViews']);		
	gulp.watch([srcFileJs],['copyJs']);
  gulp.watch(srcFileJs2,['compileEs6']); 
	gulp.watch([srcFileCss],['copyCss']);	
	gulp.watch([srcFileSass],['sassCommon']);	
	gulp.watch([srcFileImg],['copyImg']);	
});

gulp.task('default',['autowatch']);//定义默认任务
