<template>
  <el-dialog
    title="编辑信息"
    :visible.sync="childShow"
    :close-on-click-modal="false"
    width="600px"
    :before-close="close"
    center
    ><FormLists ref="formlists" :formArr="formArr" :data="data"></FormLists>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm">确 认</el-button>
      <el-button @click="close">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import FormLists from '@/components/formLists'
import { editUserInfo } from '@/api/system'
export default {
  components: { FormLists },
  model: {
    prop: 'fatherShow',
    event: 'shoChange'
  },
  props: {
    fatherShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      childShow: this.fatherShow,
      formArr: [
        { type: 'upAvatar', label: '用户头像', prop: 'avatar', upType: 'img' },
        { type: 'input', label: '用户名', prop: 'username', req: true },
        { type: 'input', label: '联系电话', prop: 'telephone', req: true, check: 'phone' },
        { type: 'input', label: '邮箱', prop: 'email', req: true, check: 'email' },
        { type: 'address', label: '地址', prop: 'address', req: true }
      ],
      data: null
    }
  },
  watch: {
    fatherShow(val) {
      if (!val) {
        this.$refs.formlists.resetForm()
      } else {
        this.$nextTick(() => {
          this.$refs.formlists.echoData()
        })
      }
      this.childShow = val
    }
  },
  computed: {},
  methods: {
    close() {
      this.$emit('shoChange', false)
    },
    async confirm() {
      console.log('1233')
      // try {
      const valid = await this.$refs.formlists.checkFrom()
      console.log('1233', valid)
      if (valid) {
        const params = this.$refs.formlists.getData()
        params.id = this.data.id
        const res = await editUserInfo(params)
        if (res.code == 200) {
          this.$message.success('编辑成功')
          this.close()
          this.$emit('refresh')
        } else {
          this.$message.error(res.msg)
        }
      }
      // } catch (error) {}
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep.el-dialog__wrapper {
  position: absolute !important;
}
::v-deep.v-modal {
  position: absolute !important;
}
</style>
