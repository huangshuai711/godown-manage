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
        { type: 'text', label: '名称', prop: 'productName' },
        { type: 'text', label: '产地', prop: 'smokePlace' },
        { type: 'text', label: '类别', prop: 'smokeType' },
        { type: 'text', label: '条条形码', prop: 'stripCodeValue' },
        { type: 'text', label: '包条形码', prop: 'packageCodeValue' },
        { type: 'text', label: '建议零售指导价（200支）', prop: 'suggestPrice' },
        { type: 'text', label: '焦油含量', prop: 'totalTar' },
        { type: 'text', label: 'smokeClassifyStr', prop: 'noticeInfo' },
        { type: 'text', label: '是否爆珠', prop: 'isBoomSmokeStr' },
        { type: 'text', label: '是否重点品牌', prop: 'isImportanceStr' },
        { type: 'text', label: '是否异型烟', prop: 'isDifferentStr' }
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
