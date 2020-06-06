<template>
  <el-select
    v-model="id"
    filterable
    clearable
    @change="change"
    placeholder="专业"
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
import { Profession } from '../api';
export default {
  name: 'SearchProfession',
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
  async mounted() {
    this.arr = await Profession.get();
    this.id = this.res;
  },
  methods: {
    change(id) {
      this.$emit('update:res', id);
    },
  },
  watch: {
    res() {
      this.id = this.res;
    },
  },
};
</script>
