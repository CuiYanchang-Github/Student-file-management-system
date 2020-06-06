'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
    async index() {
        const { app, ctx } = this;
        const { name, password } = ctx.request.body;
        const res = await app.mysql.get('user', {
            name, password
        });
        if (res) {
            ctx.body = res;
        } else {
            ctx.status = 401;
            ctx.body = { errorMsg: '账号或密码错误' };
        }
    }


}

module.exports = LoginController;
