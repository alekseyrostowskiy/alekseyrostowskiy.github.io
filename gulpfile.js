const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

gulp.task('server', function () { /* первый аргумент- название */

    browserSync({
        server: {
            baseDir: "./" /* откуда будет считывать */
        }
    });

    gulp.watch("./*.html").on('change', browserSync.reload);/* в случае изменения будет reload */
});

gulp.task('styles', function () {
    return gulp.src("sass/**/*.+(scss|sass)") /* адрес с тем, что мы будем что-то делать */
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))/* компилируем файл(указываем что скомпилированный файл будет сжатым*/
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("css"))/* сюда ложим наши скомпилированные файлы */
        .pipe(browserSync.stream());/* после изменения файлов, опять запускаем browser-sync(страница будет продолжать обновляться ) */
});

gulp.task('watch', function () {
    gulp.watch("sass/**/*.+(scss|sass)", gulp.parallel('styles'));/* первый аргумент- то, за чем мы будем следить; второй аргумент- то, что будет выполняться при изменении файлов sass */
})

gulp.task('default', gulp.parallel/* параллельный запуск команд */('watch', 'server', 'styles'));/* задача , которая будет запускаться по умолчанию */