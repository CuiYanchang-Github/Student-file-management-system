<template>
  <div>
    <el-upload
      ref="upload"
      :action="uploadUrl"
      :list-type="listType"
      :data="uploadData"
      class="pic-upload"
      :show-file-list="showFileList"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :on-remove="uploadRemove"
      :on-preview="uploadPreview"
      :on-exceed="uploadExceed"
      :limit="limit"
      :file-list="fileList"
      :disabled="disabled"
    >
      <slot>
        <i class="el-icon-plus"></i>

        <div slot="tip" v-if="listType">
          只能上传
          <span style="color: #f44179">{{ limit ? limit + '个 ' : '' }}</span>
          <span>{{ typeArr && typeArr.join('/') }}</span>
          文件
        </div>
      </slot>
    </el-upload>
    <el-dialog :visible.sync="dialogShow" append-to-body>
      <img :src="previewImgUrl" style="width: 100%;" />
    </el-dialog>
  </div>
</template>

<script>
import { qiniu } from '../api';

export default {
  name: 'upload',
  props: {
    res: {
      type: String,
    },
    limit: {
      type: [Number, String],
      default: 0,
    },
    listType: {
      type: String,
      default: 'picture-card',
    },
    typeArr: {
      type: Array,
      default() {
        return ['png', 'jpg', 'jpeg'];
      },
    },
    showFileList: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uploadUrl: 'https://up-z0.qiniup.com/',
      dialogShow: false,
      previewImgUrl: '',
      uploadData: {},
      domain: 'http://bishe.zmplay.top/',
      qiNiuToken: '',
      fileList: [],
    };
  },
  async mounted() {
    const res = await qiniu();
    this.qiNiuToken = res.data;
  },
  methods: {
    beforeUpload(file) {
      let typeArr = this.typeArr;
      if (typeArr && typeArr.length) {
        let type = file.name.split('.').pop();
        if (typeArr.indexOf(type) < 0) {
          this.$message.error('只允许上传' + typeArr.join(',') + '格式的文件');
          return false;
        }
      }
      this.uploadData.token = this.qiNiuToken;
    },
    uploadSuccess(response, file, fileList) {
      let arr = [];
      fileList.forEach((item) => {
        arr.push(item.response.key);
      });
      this.$emit('update:res', arr.join(','));
    },
    uploadRemove(file, fileList) {
      let arr = [];
      fileList.forEach((item) => {
        arr.push(item.response.key);
      });
      this.$emit('update:res', arr.join(','));
    },
    uploadPreview(file) {
      this.previewImgUrl = file.url ? file.url : this.domain + file.response;
      this.dialogShow = true;
    },
    uploadExceed() {
      this.$message.warning('只能选择' + this.limit + '个文件上传');
    },
    setFileList() {
      this.fileList = this.res
        ? this.res.split(',').map((item) => {
            return {
              url: this.domain + item,
              response: {
                key: item,
              },
            };
          })
        : [];
    },
  },
};
</script>

<style scoped></style>
