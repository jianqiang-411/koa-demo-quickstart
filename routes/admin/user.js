const router = require('koa-router')();


router.get('/', async (ctx)=>{

    await ctx.render('admin/user/user');

})

router.get('/add', async (ctx)=>{
    await ctx.render('admin/user/add');

})
router.get('/edit', async (ctx)=>{
    await ctx.render('admin/user/edit');

})


module.exports = router.routes();