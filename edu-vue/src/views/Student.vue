<template>
    <div id="Student">
        <div class="title">学生管理</div>
        <div class="head search">
            <el-input v-model="searchObj.name" placeholder="学生名"></el-input>
            <el-input v-model="searchObj.student_card_id" placeholder="学号"></el-input>
            <search-college :res.sync="searchObj.college_id"></search-college>
            <search-profession :res.sync="searchObj.profession_id"></search-profession>
            <search-class :res.sync="searchObj.class_id"></search-class>
            <search-grade :res.sync="searchObj.grade_id"></search-grade>
            <el-button @click="init">查询</el-button>
            <el-button @click="toDetail(null)" v-if="userInfo.role === 1">新增</el-button>
        </div>
        <div class="table-div">
            <el-table :data="arr" border height="700">
                <el-table-column label="学生名" prop="name"></el-table-column>
                <el-table-column label="学号" prop="student_card_id"></el-table-column>
                <el-table-column label="学院" prop="college.name"></el-table-column>
                <el-table-column label="专业" prop="profession.name"></el-table-column>
                <el-table-column label="班级" prop="class.name"></el-table-column>
                <el-table-column label="操作">
                    <template v-slot="{ row }">
                        <el-button type="text" @click="toDetail(row.id)">详情</el-button>
                        <el-button
                            type="text"
                            class="danger"
                            @click="del(row.id)"
                            v-if="userInfo.role === 1"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { Student } from "../api";

export default {
    name: "Student",
    data() {
        return {
            searchObj: {
                name: "",
                student_card_id: "",
                college_id: "",
                profession_id: "",
                class_id: "",
                grade_id: ""
            },
            arr: [],
            userInfo: {}
        };
    },
    mounted() {
        this.init();
        try {
            this.userInfo = JSON.parse(localStorage.userInfo);
        } catch (e) {
            this.$router.replace("/login");
        }
    },
    methods: {
        async init() {
            this.arr = await Student.get(this.searchObj);
        },
        del(id) {
            this.$confirm("确定要删除吗？", "提示", { type: "warning" }).then(
                async () => {
                    await Student.del(id);
                    this.init();
                }
            );
        },
        toDetail(id) {
            this.$router.push({
                path: "/student-detail",
                query: {
                    id
                }
            });
        }
    }
};
</script>

<style scoped lang="scss"></style>
