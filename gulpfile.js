
// const gulp = require('gulp');
// const sass = require('gulp-sass')(require('sass'));
// const browserSync = require('browser-sync').create();

// // Paths
// const paths = {
//     scss: 'src/scss/**/*.scss',
//     css: 'dist/css',
//     html: '*.html'
// };

// // Compile Sass
// gulp.task('compileSass', function () {
//     return gulp.src(paths.scss)
//         .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
//         .pipe(gulp.dest(paths.css))
//         .pipe(browserSync.stream()); // BrowserSync CSS inject
// });

// // BrowserSync & Watch Task
// gulp.task('watchFiles', function () {
//     browserSync.init({
//         server: {
//             baseDir: "./" // index.html যেখানে আছে সেই লোকেশন
//         }
//     });

//     gulp.watch(paths.scss, gulp.series('compileSass'));
//     gulp.watch(paths.html).on('change', browserSync.reload); // HTML পরিবর্তন হলে রিলোড
// });

// // Default Task
// gulp.task('default', gulp.series('compileSass', 'watchFiles'));

/*=======*/ 

const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

// Paths
const paths = {
    html: "index.html",  // আপনার index.html ফাইলের পাথ
    scss: "src/assets/scss/**/*.scss",  // SCSS ফাইলের পাথ
    js: "src/assets/js/**/*.js",  // JS ফাইলের পাথ
    img: "src/assets/img/**/*",  // ইমেজ ফাইলের পাথ
    fonts: "src/assets/fonts/**/*"  // ফন্ট ফাইলের পাথ
};

// SCSS to CSS কম্পাইল করা এবং মিনিফাই করা
function compileSass() {
    return src(paths.scss)
        .pipe(sass().on('error', sass.logError)) // SCSS কম্পাইল করা
        .pipe(cleanCSS()) // CSS মিনিফাই করা
        .pipe(dest("dist/assets/css")) // ডিসট ফোল্ডারে সেভ করা
        .pipe(browserSync.stream());  // ব্রাউজারে সিএসএস স্ট্রিমিং
}

// JavaScript মিনিফাই করা এবং কনক্যাট করা
function processJS() {
    return src(paths.js)
        .pipe(concat("app.js"))  // সব JS ফাইল একত্রিত করা
        .pipe(uglify())  // JS মিনিফাই করা
        .pipe(dest("dist/assets/js"))  // ডিসট ফোল্ডারে সেভ করা
        .pipe(browserSync.stream());  // ব্রাউজারে JS স্ট্রিমিং
}

// ইমেজ কপি করা
function copyImages() {
    return src(paths.img)
        .pipe(dest("dist/assets/img"))  // ডিসট ফোল্ডারে সেভ করা
        .pipe(browserSync.stream());  // ব্রাউজারে ইমেজ স্ট্রিমিং
}

// ফন্ট কপি করা
function copyFonts() {
    return src(paths.fonts)
        .pipe(dest("dist/assets/fonts"))  // ডিসট ফোল্ডারে সেভ করা
        .pipe(browserSync.stream());  // ব্রাউজারে ফন্ট স্ট্রিমিং
}

// HTML কপি করা
function copyHTML() {
    return src(paths.html)
        .pipe(dest("dist"))  // ডিসট ফোল্ডারে সেভ করা
        .pipe(browserSync.stream());  // ব্রাউজারে HTML স্ট্রিমিং
}

// Watch task
function watchFiles() {
    browserSync.init({
        server: {
            baseDir: "dist"  // ডিসট ফোল্ডার থেকে সার্ভ হবে
        }
    });

    watch(paths.scss, compileSass);  // SCSS ফাইল পরিবর্তন হলে SCSS কম্পাইল হবে
    watch(paths.js, processJS);  // JS ফাইল পরিবর্তন হলে JS প্রসেস হবে
    watch(paths.img, copyImages);  // ইমেজ ফাইল পরিবর্তন হলে ইমেজ কপি হবে
    watch(paths.fonts, copyFonts);  // ফন্ট ফাইল পরিবর্তন হলে ফন্ট কপি হবে
    watch(paths.html, copyHTML).on('change', browserSync.reload);  // HTML পরিবর্তন হলে ব্রাউজার রিফ্রেশ হবে
}

// Default task
exports.default = series(
    parallel(compileSass, processJS, copyImages, copyFonts, copyHTML),  // সমস্ত কাজ একসাথে রান হবে
    watchFiles  // ওয়াচ ফাইলটি চালু হবে
);
