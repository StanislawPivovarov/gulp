const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const sourcemaps = require('gulp-sourcemaps');
const { dest, series } = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const babel = require('gulp-babel')
const fs = require("fs")
const browserify = require("browserify");
const Babelify = require('babelify');
const zip = require('gulp-zip');
const { css } = require('jquery');


//работа со скриптом.
function script(done){
  //берем файл main
  return gulp.src('./js/main.js')
  //переводим его в ES5
  .pipe(babel({presets:['@babel/preset-env']}))
  //выводим
  .pipe(gulp.dest('./public'))
  done();
}


//работа с html
function index_html(done){
  //берем файл .pug
  return gulp.src("./index.pug")
  //переводим в html
  .pipe(pug())
  //выводим
  .pipe(gulp.dest('./public/'))
  done();
}

//работа с css
function css_style(done){
  //берем scss файл
  return gulp.src('./scss/**/*.scss')
  //инициализируем соурсмапсы
    .pipe(sourcemaps.init())
  //
    .pipe(sass.sync().on('error', sass.logError))
  //работаем с автопрефиксером, добавляет необходимые префиксы
    .pipe(autoprefixer({
      cascade: false
    }))
  //минимизируем для более быстрой загрузки сайта
    .pipe(cssmin())
  //добавляем суффикс, что наш css минимизирован
    .pipe(rename({
      suffix: '.min'
    }))
  //записываем соурсмапсы
    .pipe(sourcemaps.write('./'))
  //выводим
    .pipe(gulp.dest('./public'))
    done();
};

function tozip(done){
  return gulp.src('./public/*')
  .pipe(zip('email.zip'))
  .pipe(gulp.dest('./'))
  done();
}

// gulp.task(index_html);
// gulp.task(css_style);
// gulp.task(script);
// gulp.task(tozip)

gulp.task('default', gulp.series(index_html, css_style, script, tozip))