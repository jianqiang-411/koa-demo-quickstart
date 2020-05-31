const Koa = require('koa');
const router = require('koa-router')();
const views = require('koa-views');
const sd = require('silly-datetime');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const path = require('path');
const render = require('koa-art-template');
const session = require('koa-session');
// const DB = require('./module/db');


let app = new Koa();


//设置session
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: true, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: false, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};
app.use(session(CONFIG, app));


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

let indexRouter = require('./routes/index');
let adminRouter = require('./routes/admin');
let apiRouter = require('./routes/api');

router.use(indexRouter);
router.use('/admin', adminRouter);
router.use('/api', apiRouter);



app.use(router.routes());
app.use(router.allowedMethods());


app.listen(3000);