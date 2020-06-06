<template>
    <div class="table-div">
        <el-form
            :model="form"
            :rules="formRules"
            label-width="130px"
            style="margin-top:20px"
            ref="form"
            inline
        >
            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="照片" prop="pic">
                <upload :res.sync="form.pic" :limit="1" ref="upload" :disabled="disabled"></upload>
            </el-form-item>

            <el-form-item label="性别" prop="sex">
                <el-input v-model="form.sex" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
                <el-date-picker
                    v-model="form.birthday"
                    value-format="yyyy-MM-dd"
                    :disabled="disabled"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="民族" prop="nation">
                <el-input v-model="form.nation" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="入学日期" prop="study_day">
                <el-date-picker
                    v-model="form.study_day"
                    value-format="yyyy-MM-dd"
                    :disabled="disabled"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="是否已婚" prop="is_marry">
                <el-input v-model="form.is_marry" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="学院" prop="college_id">
                <el-input v-if="disabled" disabled v-model="student.college.name"></el-input>
                <search-college :res.sync="form.college_id" v-else></search-college>
            </el-form-item>
            <el-form-item label="专业" prop="profession_id">
                <el-input v-if="disabled" disabled v-model="student.profession.name"></el-input>
                <search-profession :res.sync="form.profession_id" v-else></search-profession>
            </el-form-item>
            <el-form-item label="班级" prop="class_id">
                <el-input v-if="disabled" disabled v-model="student.class.name"></el-input>
                <search-class :res.sync="form.class_id" v-else></search-class>
            </el-form-item>
            <el-form-item label="年级" prop="grade_id">
                <el-input v-if="disabled" disabled v-model="student.grade.name"></el-input>
                <search-grade :res.sync="form.grade_id" v-else></search-grade>
            </el-form-item>
            <el-form-item label="学号" prop="student_card_id">
                <el-input
                    v-model="form.student_card_id"
                    :disabled="disabled"
                    @input="studentCardIdChange"
                ></el-input>
            </el-form-item>
            <el-form-item label="籍贯" prop="hometown">
                <el-input v-model="form.hometown" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="住址" prop="address">
                <el-input v-model="form.address" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="文化程度" prop="education">
                <el-input v-model="form.education" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="外语语种" prop="language">
                <el-input v-model="form.language" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="本人成分" prop="ingredients">
                <el-input v-model="form.ingredients" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="考取或保送机关" prop="organ">
                <el-input v-model="form.organ" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
                <el-input v-model="form.phone" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="政治面貌" prop="political">
                <el-input v-model="form.political" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="id_card">
                <el-input v-model="form.id_card" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="毕业时间" prop="finish_day">
                <el-date-picker
                    v-model="form.finish_day"
                    value-format="yyyy-MM-dd"
                    :disabled="disabled"
                ></el-date-picker>
            </el-form-item>
        </el-form>
        <div class="head">
            <el-button
                @click="addHonor"
                v-if="!disabled && (userInfo.role === 1 || userInfo.role === 2)"
            >添加</el-button>
        </div>
        <div class="table-div">
            <el-table :data="honorArr" border height="300">
                <el-table-column label="名称">
                    <template v-slot="{ row }">
                        <el-input v-model="row.name" :disabled="disabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="时间" prop="time">
                    <template v-slot="{ row }">
                        <el-date-picker
                            v-model="row.time"
                            value-format="yyyy-MM-dd"
                            :disabled="disabled"
                        ></el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="{ $index }">
                        <el-button type="text" class="danger" @click="delHonor($index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="head">
            <el-button
                @click="addRelate"
                v-if="!disabled && (userInfo.role === 1 || userInfo.role === 2)"
            >添加</el-button>
        </div>
        <div class="table-div">
            <el-table :data="relateArr" border height="300">
                <el-table-column label="名称">
                    <template v-slot="{ row }">
                        <el-input v-model="row.name" :disabled="disabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="关系" prop="relate">
                    <template v-slot="{ row }">
                        <el-input v-model="row.relate" :disabled="disabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="年龄" prop="age">
                    <template v-slot="{ row }">
                        <el-input v-model="row.age" :disabled="disabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="性别" prop="sex">
                    <template v-slot="{ row }">
                        <el-input v-model="row.sex" :disabled="disabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="手机" prop="phone">
                    <template v-slot="{ row }">
                        <el-input v-model="row.phone" :disabled="disabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="政治面貌" prop="political">
                    <template v-slot="{ row }">
                        <el-input v-model="row.political" :disabled="disabled"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="{ $index }">
                        <el-button type="text" class="danger" @click="delRelate($index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="head">
            <el-button
                @click="disabled = false"
                v-if="disabled && (userInfo.role === 1 || userInfo.role === 2)"
            >修改</el-button>
            <el-button
                @click="confirm"
                v-if="!disabled && (userInfo.role === 1 || userInfo.role === 2)"
            >提交</el-button>
            <el-button @click="back">返回</el-button>
        </div>
    </div>
</template>
<script>
import { Student } from "@/api";
export default {
    name: "StudentDetail",
    data() {
        return {
            form: {
                name: "",
                sex: "",
                birthday: "",
                nation: "",
                study_day: "",
                is_marry: "",
                college_id: "",
                profession_id: "",
                class_id: "",
                grade_id: "",
                student_card_id: "",
                hometown: "",
                address: "",
                education: "",
                language: "",
                ingredients: "",
                organ: "",
                phone: "",
                political: "",
                id_card: "",
                finish_day: "",
                honor: "",
                relate: "",
                pic: ""
            },
            formRules: {
                name: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                sex: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                birthday: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                nation: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                study_day: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                is_marry: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                college_id: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                profession_id: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                class_id: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                grade_id: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                student_card_id: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                hometown: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                address: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                education: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                language: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                ingredients: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                organ: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                political: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                id_card: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                finish_day: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ],
                pic: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur"
                    }
                ]
            },
            formId: "",
            disabled: true,
            honorArr: [],
            relateArr: [],
            student: {
                class: {
                    name: ""
                },
                grade: {
                    name: ""
                },
                college: {
                    name: ""
                },
                profession: {
                    name: ""
                }
            },
            userInfo: {}
        };
    },
    async mounted() {
        if (this.$route.query.id) {
            this.formId = this.$route.query.id;
            const res = await Student.detail(this.$route.query.id);
            for (const key in this.form) {
                this.form[key] = res[key];
            }
            this.honorArr = JSON.parse(res.honor);
            this.relateArr = JSON.parse(res.relate);
            this.student = res;
            setTimeout(() => {
                this.$refs.upload.setFileList();
            }, 100);
        } else {
            this.disabled = false;
        }
        try {
            this.userInfo = JSON.parse(localStorage.userInfo);
        } catch (e) {
            this.$router.replace("/login");
        }
    },
    methods: {
        async confirm() {
            await this.$refs.form.validate();
            const obj = JSON.parse(JSON.stringify(this.form));
            obj.honor = JSON.stringify(this.honorArr);
            obj.relate = JSON.stringify(this.relateArr);
            if (this.formId !== "") {
                await Student.update(obj, this.formId);
                this.$router.back();
            } else {
                await Student.create(obj);
                this.$router.back();
            }
        },
        back() {
            this.$router.back();
        },
        addHonor() {
            this.honorArr.push({
                name: "",
                time: ""
            });
        },
        delHonor(index) {
            this.honorArr.splice(index, 1);
        },
        honorChange(honor, row) {
            for (const key in row) {
                row[key] = honor[key];
            }
            this.$forceUpdate();
        },

        addRelate() {
            this.relateArr.push({
                name: "",
                relate: "",
                age: "",
                sex: "",
                phone: "",
                political: ""
            });
        },
        delRelate(index) {
            this.relateArr.splice(index, 1);
        },
        relateChange(relate, row) {
            for (const key in row) {
                row[key] = relate[key];
            }
            this.$forceUpdate();
        },
        studentCardIdChange() {
            this.honorArr = [];
            this.relateArr = [];
        }
    }
};
</script>
<style scoped>
</style>
