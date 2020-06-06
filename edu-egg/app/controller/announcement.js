'use strict';

const Controller = require('egg').Controller;

class AnnouncementController extends Controller {
    // 查询 /announcement get
    async index() {
        const { app, ctx } = this;
        ctx.body = await app.mysql.select('announcement', {//select 查数组
            where: ctx.request.query,
        });
    }

    // 详情 /announcement/:id get
    async show() {
        const { app, ctx } = this;
        ctx.body = await app.mysql.get('announcement', { id: ctx.params.id });//get 查单行
    }

    // 新增 /announcement post
    async create() {
        const { ctx, app } = this;
        const result = await app.mysql.insert('announcement', ctx.request.body);//insert 插入单行
        const insertSuccess = result.affectedRows === 1;//为1的时候成功
        if (insertSuccess) {
            ctx.body = { successMsg: '新增成功' };
        } else {
            ctx.status = 422;
            ctx.body = result;
        }
    }

    // 修改 /announcement/:id put
    async update() {
        const { ctx, app } = this;
        ctx.request.body.id = ctx.params.id;
        const result = await app.mysql.update('announcement', ctx.request.body); //update 更新 posts 表中的记录
        const updateSuccess = result.affectedRows === 1;
        if (updateSuccess) {
            ctx.body = { successMsg: '更新成功' };
        } else {
            ctx.status = 422;
            ctx.body = result;
        }
    }

    // 删除 /announcement/:id delete
    async destroy() {
        const { ctx, app } = this;
        const result = await app.mysql.delete('announcement', {
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

module.exports = AnnouncementController;