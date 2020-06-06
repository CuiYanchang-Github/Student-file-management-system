<template>
    <div id="Login">
        <el-form label-width="100px" :model="loginForm" class="login-form">
            <el-form-item label="账号">
                <el-input v-model="loginForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="loginForm.password" type="password" @keydown.enter="login"></el-input>
            </el-form-item>
            <el-button type="primary" class="submit" @click="login">登录</el-button>
        </el-form>
    </div>
</template>

<script>
import { Login } from "../api";

export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                name: "",
                password: ""
            }
        };
    },
    mounted() {
        if (localStorage.userInfo) {
            this.$router.replace("/manage");
        }
    },
    methods: {
        async login() {
            const res = await Login.create(this.loginForm);
            localStorage.userInfo = JSON.stringify(res);
            this.$router.replace("/announcement");
            this.$message.success("登陆成功");
        }
    }
};
</script>

<style scoped lang="scss">
#Login {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-image: url("../assets/login.jpg");
    background-size: 100% 100%;

    .login-form {
        background: #ffffff;
        width: 500px;
        height: 300px;
        padding-top: 50px;
        border-radius: 20px;

        .submit {
            width: 300px;
            margin-left: 100px;
        }

        .el-input {
            width: 300px;
        }
    }
}
</style>
