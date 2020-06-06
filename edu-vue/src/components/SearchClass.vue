<template>
  <el-select
    v-model="id"
    filterable
    clearable
    @change="change"
    placeholder="班级"
  >
    <el-option
      v-for="item in arr"
      :key="item.id"
      :value="item.id"
      :label="item.name"
    >
    </el-option>
  </el-select>
</template>
<script>
import { Class } from '../api';
export default {
  name: 'SearchClass',
  props: {
    res: {
      type: [String, Number],
      value: '',
    },
  },
  data() {
    return {
      arr: [],
      id: '',
    };
  },
  async mounted() {//查班级数组
    this.arr = await Class.get();
    this.id = this.res;
  },
  methods: {
    change(id) {//选中触发父组件
      this.$emit('update:res', id);//把数值传出去
    },
  },
  watch: {
    res() {//监听，值改变触发函数
      this.id = this.res;
    },
  },
};
</script>
