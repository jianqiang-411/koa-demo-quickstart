const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const sd = require('silly-datetime');


let app = new Koa();
let router = new Router();




app.use(views(__dirname + "/views", { extension: 'ejs' }));
app.use(async (ctx, next) => {
    ctx.state = {
        //引入全局变量，各个ejs模块都可以直接引用
        // title: 'my title', 
        author: 'queckezz'
    };
    await next();
});

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
    let list = ['翻领设计', '的老骥伏枥', '绿色的科技扶贫我', '绿色品味贫困村'];
    await ctx.render('news', {
        list: list
    });
})

app.use(router.routes());
app.use(router.allowedMethods());


app.listen(3000);