const router = require('koa-router')();


router.get('/', async (ctx) => {

    await ctx.render('admin/index');

})


let userRouter = require('./admin/user');
let focusRouter = require('./admin/focus');


router.use('/user', userRouter);
router.use('/focus', focusRouter);



module.exports = router.routes();