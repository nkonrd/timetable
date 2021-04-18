const Koa = require('koa');
const Router = require('koa-router');
const render = require('koa-ejs');
const cors = require('@koa/cors');
const fs = require('fs');
const path = require('path');

const port = 8080;
const app = new Koa();
const router = new Router();

app.use(cors());
app.use(require('koa-static')(__dirname));
render(app, {
	root: path.join(__dirname, 'views')
})

router.get('/:id', async ctx => {
    await ctx.render('layout', {code: parseInt(ctx.params.id)});
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => console.log(`Listening on ${port}...`));