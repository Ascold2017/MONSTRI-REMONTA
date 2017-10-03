
var     gulp           = require('gulp');
var		gutil          = require('gulp-util' );
var		scss           = require('gulp-sass');
var     notify         = require('gulp-notify');
var     plumber        = require('gulp-plumber');
var     sourcemaps     = require('gulp-sourcemaps');
var		browserSync    = require('browser-sync');
var		concat         = require('gulp-concat');
var		uglify         = require('gulp-uglify');
var		cleanCSS       = require('gulp-clean-css');
var		rename         = require('gulp-rename');
var		del            = require('del');
var		imagemin       = require('gulp-imagemin');
var		cache          = require('gulp-cache');
var		autoprefixer   = require('gulp-autoprefixer');
var		ftp            = require('vinyl-ftp');
var		rsync          = require('gulp-rsync');
var     htmlmin        = require('gulp-htmlmin');


// Скрипты проекта

gulp.task('common-js', function() {
	 var commonJs = gulp.src([
		'app/js/common.js',
		])
    .pipe(plumber())
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
    
    var calculatorJs = gulp.src([
		'app/js/calculator.js',
		])
    .pipe(plumber())
	.pipe(concat('calculator.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
    
    var priceJs = gulp.src([
		'app/js/price.js',
		])
    .pipe(plumber())
	.pipe(concat('price.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
        'app/libs/slick-carousel/slick/slick.min.js',
        'app/libs/fancybox/dist/jquery.fancybox.min.js',
        'app/libs/slicknav/dist/jquery.slicknav.min.js'
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', function() {
	 gulp.src('app/scss/**/*.scss')
    .pipe(plumber())
	.pipe(scss())
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS().on("error", notify.onError())) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js', 'app/js/calculator.js','app/js/price.js'], ['js']);
	gulp.watch('app/*.html').on('change', browserSync.reload); //Перезапуск browserSynс
  
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	//.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {
    var buildFiles = gulp.src([
		'app/*.html',
		])
       .pipe(htmlmin({collapseWhitespace: true, conservativeCollapse: true,}))
        .pipe(gulp.dest('dist'));

	var buildHtaccess = gulp.src([
		'app/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/*.css',
		]).pipe(gulp.dest('dist'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));
    
    var buildСommJs = gulp.src([
		'app/js/common.min.js',
        'app/js/calculator.min.js',
        'app/js/price.min.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('rsync', function() {
	return gulp.src('dist/**')
	.pipe(rsync({
		root: 'dist/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		archive: true,
		silent: false,
		compress: true
	}));
});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
