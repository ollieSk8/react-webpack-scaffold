/**
 * Created by ollie on 2017/12/14.
 */
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const route = require('koa-route');
const serve = require('koa-static');
const app = new Koa();
const public = serve(path.resolve(__dirname, './public'));
app.use(public);
const hello = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/index.html');
};

app.use(route.get('/', hello));
app.listen(3000);