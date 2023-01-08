<template>
  <el-dialog
    title="销售单号详情"
    :visible.sync="childShow"
    :close-on-click-modal="false"
    width="600px"
    :before-close="close"
    center
    ><Exhibition ref="exhibition" :formArr="formArr" :data="data"></Exhibition>
    <Table
      :tableRow="tableRow"
      :tableData="data?.documentProductInfoList"
      :loading="false"
      class="flex-fill"
    ></Table>
  </el-dialog>
</template>
<script>
import Exhibition from '@/components/exhibition'
import Table from '@/components/table'
export default {
  components: { Exhibition, Table },
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
        { type: 'text', label: '销售单据号', prop: 'documentNum' },
        { type: 'text', label: '销售人姓名', prop: 'createUserName' },
        { type: 'text', label: '销售总数量', prop: 'totalCount' },
        { type: 'text', label: '销售时间', prop: 'createTime' }
      ],
      tableRow: [
        { key: 'productName', label: '商品名称' },
        { key: 'supplierName', label: '供应商名称' },
        { key: 'clientName', label: '客户名称' },
        { key: 'stockNum', label: '销售数量' }
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
