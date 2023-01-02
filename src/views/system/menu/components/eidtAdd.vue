<template>
  <el-dialog
    :title="pupType + '菜单'"
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
import { saveOrUpdateMenu } from '@/api/system'
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
        { type: 'input', label: '菜单名称', prop: 'name', valueName: 'menuName', req: true },
        { type: 'input', label: '路由', prop: 'menuPath', valueName: 'menuName', req: true },
        { type: 'input', label: 'key', prop: 'menuName', valueName: 'menuName', req: true },
        {
          type: 'radioTree',
          label: '父级',
          prop: 'pid',
          treeData: [],
          value: 'id',
          name: 'name',
          disabled: true
        },
        { type: 'input', label: '排序', prop: 'sortNum', req: true }
      ],
      data: null,
      treeData: null
    }
  },
  watch: {
    fatherShow(val) {
      if (!val) {
        this.$refs.formlists.resetForm()
      } else {
        this.$nextTick(() => {
          this.formArr.find(item => item.prop == 'pid').treeData = this.treeData
          this.$refs.formlists.echoData()
        })
      }
      this.childShow = val
    },
    treeData(val) {
      if (val) {
      }
    }
  },
  computed: {
    pupType() {
      return this.data?.id ? '编辑' : '新增'
    }
  },
  methods: {
    close() {
      this.$emit('shoChange', false)
    },
    async confirm() {
      try {
        const valid = await this.$refs.formlists.checkFrom()
        if (valid) {
          const params = this.$refs.formlists.getData()

          params.pid = Array.isArray(params.pid) ? params.pid?.[params.pid?.length - 1] : params.pid
          params.menuName = params.name
          this.data?.id && (params.id = this.data.id)
          const res = await saveOrUpdateMenu(params)
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
