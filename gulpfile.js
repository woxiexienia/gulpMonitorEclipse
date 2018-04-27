var gulp = require('gulp'),
	changed = require('gulp-changed'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-clean-css'),					//压缩css
	autoprefixer = require('gulp-autoprefixer'),		//添加浏览器前缀
	clean = require('gulp-clean'),						//清理文目标文件夹
	csso = require('gulp-csso'),						//合并css属性
	csslint = require('gulp-csslint'),					//css语法检查
	csscomb = require('gulp-csscomb'),					//css 样式表的各属性的顺序
	cache = require('gulp-cache')
;

var target = 'D:/apache-tomcat-8.0.43/webapps/mkh1.0/system/';
	//target = 'F:/test/';
var srcFile = 'D:/workspace/mkh1.0/WebRoot/system/',
	srcFileView = srcFile+'view/**/*.html',
	srcFileViews2 = srcFile+'views2/**/*.html',
	srcFileJs = srcFile+'view/**/js/*.js',
	srcFileCss = srcFile+'view/**/css/*.css',
	srcFileSassCommon = srcFile+'sass2/common/**/*.scss',
	srcFileSassController = srcFile+'sass2/controller/**/*.scss',
	srcFileSassWap = srcFile+'sass2/wap/**/*.scss',
	srcFileImg = srcFile+'css/img/**/*.{jpg,png}'
	;
/*由于外部编辑器修改后，需要七八秒eclipse才能监听到文件，因此直接复制文件到eclipse发布的目录*/
gulp.task('copyViews', function() {
    gulp.src(srcFileView)
      .pipe(changed(target+'view'))
      .pipe(gulp.dest(target+'view'));

});
gulp.task('copyViews2', function() {
    gulp.src(srcFileViews2)
      .pipe(changed(srcFileViews2))
      .pipe(gulp.dest(target+'view'));

});
gulp.task('copyJs', function() {
    gulp.src(srcFileJs)
      .pipe(changed(srcFileJs))
      .pipe(gulp.dest(target+'view'));

});
gulp.task('copyCss', function() {
    gulp.src(srcFileCss)
      .pipe(changed(srcFileCss))
      .pipe(gulp.dest(target+'css'));

});
gulp.task('copyImg', function() {
    gulp.src(srcFileImg)
      .pipe(changed(srcFileImg))
      .pipe(gulp.dest(target+'css/img'));

});

gulp.task('sassCommon',function () {			
    gulp.src(srcFileSassCommon)
    	.pipe(sass())
	    .pipe(cssmin())
	    .pipe(autoprefixer())
	    .pipe(csso())
	    .pipe(csslint())
	    .pipe(gulp.dest(srcFile+'css/common2'))
	    .pipe(gulp.dest(target+'css/common2'));	//同时更改到eclipse发布的目录下
});

gulp.task('sassController',function () {			
    gulp.src(srcFileSassController)
    	.pipe(sass())
	    .pipe(cssmin())
	    .pipe(autoprefixer())
	    .pipe(csso())
	    .pipe(csslint())
	    .pipe(gulp.dest(srcFile+'css/common2'))
	    .pipe(gulp.dest(target+'css/common2'));
});

gulp.task('sassWap',function () {			
    gulp.src(srcFileSassWap)
    	.pipe(sass())
	    .pipe(cssmin())
	    .pipe(autoprefixer())
	    .pipe(csso())
	    .pipe(csslint())
	    .pipe(gulp.dest(srcFile+'css/mobile'))
	    .pipe(gulp.dest(target+'css/mobile'));
});

gulp.task("autowatch",function(){
	gulp.watch([srcFileView],['copyViews']);		
	gulp.watch([srcFileViews2],['copyViews2']);	
	gulp.watch([srcFileJs],['copyJs']);	
	//gulp.watch([srcFileCss],['copyCss']);	
	gulp.watch([srcFileSassCommon],['sassCommon']);	
	gulp.watch([srcFileSassController],['sassController']);	
	gulp.watch([srcFileSassWap],['sassWap']);	
	gulp.watch([srcFileImg],['copyImg']);	
});

gulp.task('default',['autowatch']);//定义默认任务
