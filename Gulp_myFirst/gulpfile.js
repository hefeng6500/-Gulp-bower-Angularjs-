var gulp = require('gulp');					//首先得require gulp依赖
var $ = require('gulp-load-plugins')();		//按需加载插件，其他插件不用一个一个的引入
var open = require('open');					//open插件是个例外，https://www.npmjs.com/package/open


//var babel = require("gulp-babel");    // 用于ES6转化ES5
//var less = require('gulp-less');			//编译less文件，注意version 4.0.0版本在gulp时，凡是有@import的less文件不会编译，本项目采用的version3.1.0
//var cssmin = require('gulp-minify-css');
//var sourcemaps = require('gulp-sourcemaps');	//当less有各种引入关系时，编译后不容易找到对应less文件，所以需要生成sourcemap文件，方便修改	

var app = {
	srcPath: 'src/',		//项目资源地址
	distPath: 'dist/'		//压缩后的地址
}

gulp.task('html',function(){		//压缩.html文件
	var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
	gulp.src(app.srcPath + '**/*.html')
		.pipe($.plumber())
		.pipe($.htmlmin(options))
		.pipe(gulp.dest(app.distPath))
		.pipe($.connect.reload());		//源自于gulp-connect插件，功能：浏览器自动刷新
});

gulp.task('less',function(){	//less解释为css，并压缩成一行
	gulp.src(app.srcPath + 'styles/index.less')
		.pipe($.sourcemaps.init())  //源自于gulp-sourcemaps，它是一个独立的map文件，与源码在同一个目录下，css压缩成一行就没有了哦，只有未压缩成一行才会显示   　//@ sourceMappingURL=jquery.min.map
		.pipe($.plumber())	//源自于gulp-plumber，处理错误进程，输出错误日志
        .pipe($.less())		//.less编译成.css
		.pipe($.sourcemaps.write())	//文件底部写入sourcemaps
		.pipe($.minifyCss())	//压缩css成一行
		.pipe(gulp.dest(app.distPath + 'css'))
		.pipe($.connect.reload());
});

gulp.task('js', function() {	//压缩并且合并
	gulp.src(app.srcPath + 'script/**/*.js')
		.pipe($.plumber())
		.pipe($.concat('index.js'))		//合并成一个名为index.js文件
		.pipe($.babel()) 		//ES6转ES5
		.pipe($.uglify())		//源自于gulp-uglify，功能压缩js
		.pipe(gulp.dest(app.distPath + 'js'))
		.pipe($.connect.reload())
});

gulp.task('image', function() {	//压缩图片文件
	gulp.src(app.srcPath + 'image/*.*')
		.pipe($.plumber())
//		.pipe($.imagemin())		//压缩，但是在gulp时发现报错：gulp-imagemin: Couldn't load default plugin "svgo"
		.pipe(gulp.dest(app.distPath + 'image'))
		.pipe($.connect.reload())
});

gulp.task('lib',function(){		//将依赖文件打包
	gulp.src('bower_components/**/*')
		.pipe($.plumber())
		.pipe(gulp.dest(app.distPath + 'vendor'))	//vendor: 中文义，供应商
		.pipe($.connect.reload())
});

gulp.task('font',function(){		//将模拟数据.json文件打包
	gulp.src([
		app.srcPath +'**/*.woff2',
		app.srcPath +'**/*.woff',
		app.srcPath +'**/*.eot',
		app.srcPath +'**/*.ttf',
		app.srcPath +'**/*.otf',
		app.srcPath +'**/*.svg',
		
	])
		.pipe(gulp.dest(app.distPath))
		.pipe($.connect.reload())
});

gulp.task('data',function(){		//将模拟数据.json文件打包
	gulp.src(app.srcPath + 'data/**/*.json')
		.pipe($.plumber())
		.pipe(gulp.dest(app.distPath + 'data'))
		.pipe($.connect.reload())
});

gulp.task('clean', function() {
	return gulp.src([app.distPath])
		.pipe($.clean());
});

gulp.task('build',['lib','html','less','js','image','data','font']);

gulp.task('serve',['build'],function(){
	$.connect.server({			//前端启动服务，源自于gulp-connect
	    root: [app.distPath],	//服务启动的根目录
	    livereload: true,		//即时刷新
	    port: 8000				//端口
	});
	open('http://127.0.0.1:8000');	//第二个参数可以指定: 'firefox','chrome',
	
	//gulp.watch 监听任务，目录下的之资源changed，执行任务流
	gulp.watch('bower_components/**/*',['lib']);
	gulp.watch(app.srcPath + '**/*.html',['html']);
	gulp.watch(app.srcPath + 'styles/*.less',['less']);		//当所有src/less下的 .less文件发生改变时，调用less任务
	gulp.watch(app.srcPath + 'script/**/*.js',['js']);
	gulp.watch(app.srcPath + 'image/**/*',['image']);
	gulp.watch(app.srcPath + 'data/**/*.json',['data']);
});

gulp.task('default',['clean'],function(){	//default默认执行，也就是运行gulp命令自动执行default任务流；
	gulp.start('serve');
});

