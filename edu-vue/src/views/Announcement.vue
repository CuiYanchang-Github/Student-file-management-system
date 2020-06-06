<template>
    <div class="announcement">
        <div class="title">公告</div>
        <div class="table-div">
            <el-input v-model="name" placeholder="请输入公告" type="textarea"></el-input>
        </div>
        <div class="head">
            <el-button v-if="userInfo.role === 1" @click="update">确定</el-button>
            <!-- userInfo.role判断权限管理 1为学工处 -->
        </div>
    </div>
</template>
<script>
import { Announcement } from "@/api";
export default {
    data() {
        return {
            name: "",//文本框
            userInfo: {}
        };
    },
    async mounted() {//async异步转换为同步
        try {
            this.userInfo = JSON.parse(localStorage.userInfo);//获得权限
        } catch (e) {
            this.$router.replace("/login");
        }
        this.name = (await Announcement.detail(1)).name;//请求ID唯一的接口
    },
    methods: {
        async update() {
            await Announcement.update({ name: this.name }, 1);
        }
    }
};
</script>
<style lang="scss" scope>
.announcement {
    display: flex;
    flex-direction: column;
}
</style>
