const router = require('koa-router')();


router.get('/', async (ctx) => {
    await ctx.render('admin/focus/focus');

})

router.get('/add', async (ctx) => {
    await ctx.render('admin/focus/add');

})
router.get('/edit', async (ctx) => {
    await ctx.render('admin/focus/edit');
})

module.exports = router.routes();