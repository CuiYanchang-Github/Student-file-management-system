<template>
    <div id="User">
        <div class="title">用户管理</div>
        <div class="head">
            <el-button @click="openDialog(null)">新增</el-button>
        </div>
        <div class="table-div">
            <el-table :data="arr" border height="700">
                <el-table-column label="名称" prop="name"></el-table-column>
                <el-table-column label="密码" prop="password"></el-table-column>
                <el-table-column label="角色" prop="roleName"></el-table-column>
                <el-table-column label="操作">
                    <template v-slot="{row}">
                        <el-button type="text" @click="openDialog(row)">编辑</el-button>
                        <el-button type="text" class="danger" @click="del(row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :visible.sync="dialogShow" append-to-body>
            <el-form ref="form" :model="form" :rules="formRules" label-width="100px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" clearable type="password"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="form.role">
                        <el-option
                            v-for="item in roleArr"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template v-slot:footer class="dialog-footer">
                <el-button @click="dialogShow=false">取消</el-button>
                <el-button @click="confirmForm" type="primary">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { User } from "../api";

export default {
    name: "User",
    data() {
        return {
            arr: [],
            formId: "",
            form: {
                name: "",
                password: "",
                role: ""
            },
            formRules: {
                name: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                role: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "change"
                    }
                ]
            },
            dialogShow: false,
            roleArr: [
                { id: 1, name: "学工处" },
                { id: 2, name: "辅导教师" },
                { id: 3, name: "其他人员" }
            ]
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            this.arr = (await User.get()).map(item => {
                item.roleName = this.roleArr.find(
                    val => val.id === item.role
                ).name;
                return item;
            });
        },
        async confirmForm() {
            await this.$refs.form.validate();
            const obj = JSON.parse(JSON.stringify(this.form));
            if (this.formId !== "") {
                await User.update(obj, this.formId);
                this.dialogShow = false;
                this.init();
            } else {
                await User.create(obj);
                this.dialogShow = false;
                this.init();
            }
        },

        del(id) {
            this.$confirm("确定要删除吗？", "提示", { type: "warning" }).then(
                async () => {
                    await User.del(id);
                    this.init();
                }
            );
        },
        openDialog(row) {
            this.dialogShow = true;
            this.$nextTick(async () => {
                this.$refs.form.resetFields();
                if (row) {
                    this.formId = row.id;
                    for (const key in this.form) {
                        this.form[key] = row[key];
                    }
                } else {
                    this.formId = "";
                }
            });
        }
    }
};
</script>

<style scoped lang="scss">
</style>