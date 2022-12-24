<template>
  <el-dialog
    title="进货单号详情"
    :visible.sync="childShow"
    :close-on-click-modal="false"
    width="600px"
    :before-close="close"
    center
    ><Exhibition ref="exhibition" :formArr="formArr" :data="data"></Exhibition>
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
      formArr: [
        { type: 'text', label: '进货单据号', prop: 'documentNum' },
        { type: 'text', label: '进货人姓名', prop: 'createUserName' },
        { type: 'text', label: '进货总数量', prop: 'totalCount' },
        { type: 'text', label: '进货时间', prop: 'createTime' }
      ],
      data: null
    }
  },
  watch: {
    fatherShow(val) {
      if (!val) {
        this.$refs.exhibition.resetForm()
      } else {
        this.$nextTick(() => {
          this.$refs.exhibition.echoData()
        })
      }
      this.childShow = val
    }
  },
  computed: {},
  methods: {
    close() {
      this.$emit('shoChange', false)
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
