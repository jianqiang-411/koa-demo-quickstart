const router = require('koa-router')();

router.get('/', async (ctx) => {
    // console.log(ctx.query);


    //cookie
    // let username = new Buffer("涨势").toString("base64");
    // ctx.cookies.set("username", username, {
    //     maxAge: 60*1000*60
    // });

    //session
    // ctx.session.userinfo = "我是session得到";


    let title = "传过来的title";
    await ctx.render('default/index', {
        title: title
    });
})

router.get('/news', async (ctx) => {
    // console.log(ctx.query);

    //cookie
    // let username = ctx.cookies.get("username");
    // username = new Buffer(username, "base64").toString();
    // console.log("username: ", username);
    //session
    //  console.log(ctx.session.userinfo);

    let list = {
        arr: ['翻领设计', '的老骥伏枥', '绿色的科技扶贫我', '绿色品味贫困村'],
        h: "<h2>我是一个h2</>",
        num: 8,
    }

    await ctx.render('default/news', {
        list: list
    });
})

router.post('/doLogin', async (ctx) => {

    // ctx.body = ctx.request.body;

    console.log("post: ", ctx.request.body);

    ctx.redirect('/');
    

})

module.exports = router.routes();