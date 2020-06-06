<template>
    <div id="Manage">
        <div class="menu">
            <div class="company-name">学生档案管理系统</div>
            <el-dropdown @command="handleCommand">
                <div class="user-info">
                    {{ userInfo.name }}
                    <i class="el-icon el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="updatePsd">修改密码</el-dropdown-item>
                    <el-dropdown-item command="exit">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <img src="../assets/logo.png" alt class="logo" />
            <el-menu
                ref="menu"
                unique-opened
                router
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <el-menu-item index="/announcement">公告</el-menu-item>
                <el-menu-item index="/grade" v-if="userInfo.role === 1">学年管理</el-menu-item>
                <el-menu-item index="/college" v-if="userInfo.role === 1">学院管理</el-menu-item>
                <el-menu-item index="/profession" v-if="userInfo.role === 1">专业管理</el-menu-item>
                <el-menu-item index="/class" v-if="userInfo.role === 1">班级管理</el-menu-item>
                <el-menu-item index="/user" v-if="userInfo.role === 1">用户管理</el-menu-item>
                <!-- <el-menu-item index="/honor" v-if="userInfo.role === 1"
          >荣誉管理</el-menu-item
        >
        <el-menu-item index="/relate" v-if="userInfo.role === 1"
          >家属管理</el-menu-item
                >-->
                <el-menu-item index="/student">学生管理</el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <router-view class="child" />
        </div>
        <el-dialog :visible.sync="dialogShow">
            <el-form ref="form" :model="form" :rules="formRules" label-width="100px">
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
            </el-form>
            <template v-slot:footer>
                <el-button @click="dialogShow = false">取消</el-button>
                <el-button @click="confirmForm" type="primary">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { User } from "../api";

export default {
    name: "Manage",
    data() {
        return {
            userInfo: {},
            form: {
                password: ""
            },
            formRules: {
                password: [
                    {
                        required: true,
                        message: "必填",
                        trigger: "blur"
                    }
                ]
            },
            dialogShow: false
        };
    },
    mounted() {
        try {
            this.userInfo = JSON.parse(localStorage.userInfo);
        } catch (e) {
            this.$router.replace("/login");
        }
    },
    methods: {
        async confirmForm() {
            await this.$refs.form.validate();//修改密码
            const obj = JSON.parse(JSON.stringify(this.form));//做一个深复制（全新的地址里面的值一样）
            await User.update(obj, this.userInfo.id);
            this.dialogShow = false;//当前弹窗消失
        },
        handleCommand(command) {
            switch (command) {
                case "updatePsd": {
                    this.dialogShow = true;
                    this.$nextTick(() => {
                        this.form = {
                            password: ""
                        };
                    });
                    break;
                }
                case "exit": {
                    this.$confirm("是否退出?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        localStorage.clear();
                        this.$message({
                            type: "success",
                            message: "退出登录成功!"
                        });
                        this.$router.replace("/login");
                    });
                    break;
                }
                default:
                    break;
            }
        }
    }
};
</script>

<style lang="scss">
.el-form {
    .el-input,
    .el-date-editor.el-input {
        width: 250px;
    }
}

#Manage {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
    height: 100%;

    .menu {
        display: flex;
        flex-direction: column;
        width: 250px;
        height: 100%;
        background: #545c64;
        align-items: center;
        .company-name {
            text-align: center;
            font-size: 26px;
            font-weight: bold;
            color: #ffffff;
            height: 120px;
            line-height: 120px;
        }

        .logo {
            width: 120px;
            height: 120px;
            border-radius: 6px;
        }

        .el-dropdown {
            display: flex;
            flex-direction: row;
            justify-content: center;

            .user-info {
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: 16px;
                margin-bottom: 20px;
                color: #ffffff;
            }
        }
        .el-menu {
            width: 250px;
            height: 100%;
            border: none;
            .el-menu-item {
                text-align: center;
                font-size: 20px;
            }
        }
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: scroll;

        .child {
            margin: 5px 4px 0;

            .table-div {
                margin: 20px;
            }

            .head {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                margin: 20px 20px 0;
                flex-wrap: wrap;
                .search-div {
                    display: flex;
                    align-items: center;
                }
            }

            .head.search {
                justify-content: flex-start;

                .label,
                .el-input {
                    margin-right: 10px;
                }
                .el-input {
                    width: 200px;
                }
            }
            .table-div {
                margin: 20px;
            }
            .title {
                font-size: 28px;
                font-weight: bold;
                margin: 20px 20px 0;
            }
        }
    }
}
</style>
