<template>
  <el-dialog
    :title="pupType + '商品'"
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
import { addCommodity, editCommodity } from '@/api/baseData'
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
        { type: 'input', label: '商品名称', prop: 'productName', req: true },
        { type: 'input', label: '供应商', prop: 'supplierName', req: true },
        { type: 'input', label: '期初库存', prop: 'openingInventory', req: true },
        { type: 'input', label: '期末库存', prop: 'finalInventory', req: true },
        { type: 'input', label: '价格', prop: 'productPrice', req: true }
      ],
      data: null
    }
  },
  watch: {
    fatherShow(val) {
      if (!val) {
        this.$refs.formlists.resetForm()
      } else {
        // 数据处理
        this.$nextTick(() => {
          this.$refs.formlists.echoData()
        })
      }
      this.childShow = val
    }
  },
  computed: {
    pupType() {
      return this.data ? '编辑' : '新增'
    }
  },
  methods: {
    close() {
      this.$emit('shoChange', false)
    },
    async confirm() {
      try {
        const inter = this.data ? editCommodity : addCommodity
        const valid = await this.$refs.formlists.checkFrom()
        if (valid) {
          const params = this.$refs.formlists.getData()
          this.data?.id && (params.id = this.data.id)
          const res = await inter(params)
          if (res.code == 200) {
            this.$message.success(this.pupType + '成功')
            this.close()
            this.$emit('refresh')
          } else {
            this.$message.error(res.msg)
          }
        }
      } catch (error) {}
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
