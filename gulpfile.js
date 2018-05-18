var gulp         = require('gulp'),
    changed      = require('gulp-changed'),
    rename       = require('gulp-rename'),
    babel        = require('gulp-babel'),           // 编译es6
    sass         = require('gulp-sass'),            // 编译sass
    cssmin       = require('gulp-clean-css'),				// 压缩css
    autoprefixer = require('gulp-autoprefixer'),		// 添加浏览器前缀
    clean        = require('gulp-clean'),						// 清理文目标文件夹
    csso         = require('gulp-csso'),						// 合并css属性
    csslint      = require('gulp-csslint'),					// css语法检查
    csscomb      = require('gulp-csscomb'),					// css 样式表的各属性的顺序
    cache        = require('gulp-cache')
    browserSync  = require('browser-sync').create() //  热更新
    plumber      = require('gulp-plumber'),         // 抛出错误
    notify       = require('gulp-notify')           // 弹出错误信息
    ;






// var target = 'D:/apache-tomcat-8.0.43/webapps/mkh1.0/system/'; //myeclipse
var target = 'D:/workspace/mkh2.1/target/mkh1.0/system/';
// var srcFile = 'D:/workspace/mkh1.0/WebRoot/system/';
var srcFile = 'D:/workspace/mkh2.1/src/main/webapp/system/';

var srcFileView = srcFile+'view/**/*.html',
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
      .pipe(changed(target+'view'), {hasChanged: changed.compareSha1Digest})
      .pipe(gulp.dest(target+'view'))
      .pipe(browserSync.reload({stream:true}));
});

// es6
/* presets-es2015 需要在全局安装不然无法编译 */
gulp.task('compileEs6', function() {
    gulp.src(srcFileJs2)
      .pipe(changed(target+'view'), {hasChanged: changed.compareSha1Digest})
      .pipe(plumber({ //plumber触发错误提示
        errorHandler: notify.onError("Error: <%= error.message %>")
      }))
      .pipe(babel({
        presets: ['es2015'],
        // plugins: ['transform-object-assign']
      }))
      .on('error', (e) => {
         console.log('>>> ERROR', e);
      })
      .pipe(rename(function (path) {
        path.dirname = path.dirname.replace('js2', 'js')
      }))
      .pipe(gulp.dest(srcFile+'view'))
      .pipe(gulp.dest(target+'view'));
});

// js
gulp.task('copyJs', function() {
    gulp.src(srcFileJs)
      .pipe(changed(srcFileJs))
      .pipe(gulp.dest(target+'view'))
      .pipe(browserSync.reload({stream:true}));
});

// css
gulp.task('copyCss', function() {
    gulp.src(srcFileCss)
      .pipe(changed(srcFileCss))
      .pipe(gulp.dest(target+'view'))
      .pipe(browserSync.reload({stream:true}));
});

// img
gulp.task('copyImg', function() {
    gulp.src(srcFileImg)
      .pipe(changed(srcFileImg))
      .pipe(gulp.dest(target+'css/img'))
      .pipe(browserSync.reload({stream:true}));
});

// sass
gulp.task('sassCommon',function () {      
    gulp.src(srcFileSass)
      .pipe(changed(srcFileSass), {hasChanged: changed.compareSha1Digest})
      .pipe(sass()).on('error', sass.logError)
      .pipe(cssmin())
      .pipe(autoprefixer())
      .pipe(csso())
      // .pipe(csslint())
      .pipe(rename(function (path) {
        path.dirname = path.dirname.replace('sass', 'css')
      }))
      .pipe(gulp.dest(srcFile+'view'))
});

gulp.task("autowatch",function(){
  browserSync.init({
      //proxy:'localhost:8080', // 设置本地服务器的地址
      proxy: 'localhost'
  });
	gulp.watch([srcFileView],['copyViews']);		
	gulp.watch([srcFileJs],['copyJs']);
  gulp.watch(srcFileJs2,['compileEs6']); 
	gulp.watch([srcFileCss],['copyCss']);	
	gulp.watch([srcFileSass],['sassCommon']);	
	gulp.watch([srcFileImg],['copyImg']);
});

gulp.task('default',['autowatch']);//定义默认任务
