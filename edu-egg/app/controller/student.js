'use strict';

const Controller = require('egg').Controller;

class StudentController extends Controller {
    // 查询 /student get
    async index() {
        const { app, ctx } = this;
        const query = ctx.request.query;//前端传过来的查询条件
        for (const key in query) {
            if (!query[key]) {
                Reflect.deleteProperty(query, key);//查询条件如果为空 删除查询条件
            }
        }
        const res = await app.mysql.select('student', { where: query });
        for (const item of res) {//用id查name
            item.grade = await app.mysql.get('grade', { id: item.grade_id });
            item.class = await app.mysql.get('class', { id: item.class_id });
            item.college = await app.mysql.get('college', { id: item.college_id });
            item.profession = await app.mysql.get('profession', {
                id: item.profession_id,
            });
        }
        ctx.body = res;//赋值给前端界面
    }

    // 详情 /student/:id get
    async show() {
        const { app, ctx } = this;
        const item = await app.mysql.get('student', { id: ctx.params.id });
        item.grade = await app.mysql.get('grade', { id: item.grade_id });
        item.class = await app.mysql.get('class', { id: item.class_id });
        item.college = await app.mysql.get('college', { id: item.college_id });
        item.profession = await app.mysql.get('profession', {
            id: item.profession_id,
        });
        ctx.body = item;
    }

    // 新增 /student post
    async create() {
        const { ctx, app } = this;
        const test = await app.mysql.get('student', {//判断学号是否重复
            student_card_id: ctx.request.body.student_card_id,
        });
        if (test) {
            ctx.status = 422;
            ctx.body = { errorMsg: '学号重复' };
            return;
        }
        const result = await app.mysql.insert('student', ctx.request.body);
        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess) {
            ctx.body = { successMsg: '新增成功' };
        } else {
            ctx.status = 422;
            ctx.body = result;
        }
    }

    // 修改 /student/:id put
    async update() {
        const { ctx, app } = this;
        ctx.request.body.id = ctx.params.id;
        const result = await app.mysql.update('student', ctx.request.body);
        const updateSuccess = result.affectedRows === 1;
        if (updateSuccess) {
            ctx.body = { successMsg: '更新成功' };
        } else {
            ctx.status = 422;
            ctx.body = result;
        }
    }

    // 删除 /student/:id delete
    async destroy() {
        const { ctx, app } = this;
        const result = await app.mysql.delete('student', {
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

module.exports = StudentController;