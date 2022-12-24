<template>
  <el-dialog
    title="进货"
    :visible.sync="childShow"
    :close-on-click-modal="false"
    width="600px"
    :before-close="close"
    center
  >
    <el-form :model="formRole" ref="from" label-width="100px" class="demo-ruleForm">
      <el-form-item label="数量" prop="num">
        <el-input-number v-model="formRole.num" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提 交</el-button>
        <el-button @click="close">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import Exhibition from '@/components/exhibition'
export default {
  components: { Exhibition },
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
      formRole: {
        num: 1
      },
      data: null
    }
  },
  watch: {
    fatherShow(val) {
      this.childShow = val
    }
  },
  computed: {},
  methods: {
    close() {
      this.$emit('shoChange', false)
    },
    submitForm() {
      this.$refs.from.validate(valid => {
        if (valid) {
        }
      })
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
