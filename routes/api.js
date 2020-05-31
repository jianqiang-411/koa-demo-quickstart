const router = require('koa-router')();


router.get('/', async (ctx)=>{
    ctx.body='api管理主页'

})


module.exports = router.routes();