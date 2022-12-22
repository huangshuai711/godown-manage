<template>
  <el-dialog
    title="商品详情"
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
        { type: 'text', label: '供应商名称', prop: 'supplierName' },
        { type: 'text', label: '负责人名称', prop: 'supplierUsername' },
        { type: 'text', label: '负责人电话', prop: 'supplierPhone' },
        { type: 'text', label: '供应商地址', prop: 'supplierAddress' }
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
