const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const sd = require('silly-datetime');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const path = require('path');
const render = require('koa-art-template');

let app = new Koa();
let router = new Router();

//处理设置模版 (因为art-template 比 ejs模版快)
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
  });
//处理post请求
app.use(bodyParser());
//处理静态资源
app.use(static(__dirname + '/static'));
//全局中间件-使用全局变量
app.use(async (ctx, next) => {
    ctx.state = {
        //引入全局变量，各个ejs模块都可以直接引用
        // title: 'my title', 
        author: 'queckezz'
    };
    await next();
});
//全局中间件-统一处理
app.use(async (ctx, next) => {

    let dateTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    console.log(`访问时间：${dateTime}`);

    await next();


    if (ctx.status == 404) {
        ctx.status = 404;
        ctx.body = "这是一个 404 页面";
    } else {
        console.log(ctx.url);
    }
})

router.get('/', async (ctx) => {
    // console.log(ctx.query);
    let title = "传过来的title";
    await ctx.render('index', {
        title: title
    });
})

router.get('/news', async (ctx) => {
    // console.log(ctx.query);

    let list = {
        arr: ['翻领设计', '的老骥伏枥', '绿色的科技扶贫我', '绿色品味贫困村'],
        h: "<h2>我是一个h2</>",
        num: 8,
    }

    await ctx.render('news', {
        list: list
    });
})

router.post('/doLogin', async (ctx) => {

    ctx.body = ctx.request.body;
    

})





app.use(router.routes());
app.use(router.allowedMethods());


app.listen(3000);