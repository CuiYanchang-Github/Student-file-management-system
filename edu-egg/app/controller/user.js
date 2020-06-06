'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    // 查询 /user get
    async index() {
        const { app, ctx } = this;
        ctx.body = await app.mysql.select('user', { where: ctx.request.query });
    }

    // 详情 /user/:id get
    async show() {
        const { app, ctx } = this;
        ctx.body = await app.mysql.select('question', {
            where: { teacher_id: ctx.params.id },
        });
    }

    // 新增 /user post
    async create() {
        const { ctx, app } = this;
        const result = await app.mysql.insert('user', ctx.request.body);
        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess) {
            ctx.body = { successMsg: '新增成功' };
        } else {
            ctx.status = 422;
            ctx.body = result;
        }
    }

    // 修改 /user/:id put
    async update() {
        const { ctx, app } = this;
        ctx.request.body.id = ctx.params.id;
        const result = await app.mysql.update('user', ctx.request.body); // 更新 posts 表中的记录
        const updateSuccess = result.affectedRows === 1;
        if (updateSuccess) {
            ctx.body = { successMsg: '更新成功' };
        } else {
            ctx.status = 422;
            ctx.body = result;
        }
    }

    // 删除 /user/:id delete
    async destroy() {
        const { ctx, app } = this;
        const result = await app.mysql.delete('user', {
            id: ctx.params.id,
        });
        const deleteSuccess = result.affectedRows === 1;
        if (deleteSuccess) {
            ctx.body = { successMsg: '删除成功' };
        } else {
            ctx.status = 422;
            ctx.body = result;
        }
    }
}

module.exports = UserController;