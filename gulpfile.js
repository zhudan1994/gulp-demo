var gulp = require('gulp');
var uglify = require('gulp-uglify'); // 压缩变异js文件
var rename = require('gulp-rename'); // 文件重命名
var cssmin = require('gulp-cssmin'); // 压缩编译css文件
var less = require('gulp-less'); // 编译less文件
var clean = require('gulp-clean'); // 清除目录下的所有文件
var livereload = require('gulp-livereload'); // 监听文件变化
var concat = require('gulp-concat'); // 将多个文件合成一个文件输出
var header = require('gulp-header');


var dist = {
	path: './dist/'
}


// 将所有js压缩到./dist/js/common.js
gulp.task('js', ["cleanJs"], function () {
	gulp.src("./public/*.js")
	  .pipe(uglify())
	  .pipe(concat('common.js'))
	  .pipe(rename({
	  	dirname: 'js/',
	  	suffix: ".min"
	  }))
	  .pipe(header('/* author: zhuan' + 
	  	 '* 创建时间 2018/03/28' +
	     '*/'))
	  .pipe(gulp.dest(dist.path))
	  .pipe(livereload())
})
// 将所有的less文件压缩编译到./dist/css/commoncss.css
gulp.task('less', function () {
	gulp.src("./public/*.less")
	  .pipe(less())
	  .pipe(cssmin())
	  .pipe(concat('commoncss.css'))
	  .pipe(rename({
	  	dirname: 'css/',
	  	suffix: '.min'
	  }))
	  .pipe(gulp.dest(dist.path))
	  .pipe(livereload())
})
gulp.task('moduleCss', function () {
	gulp.src("./public/module-css/*.css")
	  .pipe(less())
	  .pipe(cssmin())
	  .pipe(concat('modulecss.css'))
	  .pipe(rename({
	  	dirname: 'css/',
	  	suffix: '.min'
	  }))
	  .pipe(gulp.dest(dist.path))
	  .pipe(livereload())
})
// 每次编译前先清空原来的文件(目前的文件编译暂时不需要清空)
gulp.task('cleanJs', function () {
    return gulp.src("./dist/js", {read: false})
           .pipe(clean())
});
gulp.task('cleanCss', function () {
    return gulp.src("./dist/css", {read: false})
           .pipe(clean())
});

gulp.task("watch", function () {
	livereload.listen();
	gulp.watch("./public/*.js", ['js']);
	gulp.watch("./public/*.less", ['less']);
	gulp.watch("./public/module-css/*.css", ['moduleCss']);
})

gulp.task("default", ["js", "less", "moduleCss"]);