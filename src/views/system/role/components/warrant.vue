<template>
  <el-dialog
    :title="title"
    :visible.sync="childShow"
    :close-on-click-modal="false"
    width="600px"
    :before-close="close"
    center
  >
    <div style="margin-bottom: 20px">用户名：{{ data?.username }}</div>
    <TreeTable
      :treeRow="treeRow"
      :treeData="treeData"
      ref="treeTable"
      :loading="loading"
      :selection="true"
      class="flex-fill"
    ></TreeTable>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm">确 认</el-button>
      <el-button @click="close">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import TreeTable from '@/components/treeTable'
import { getSllMenuTree, roleMenu, getRoleMenu } from '@/api/system'
import { getAllMenuTree } from '@/api/user'
export default {
  components: { TreeTable },
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
      data: null,
      title: '菜单授权',
      treeRow: [{ key: 'name', label: '菜单名称' }],
      treeData: [],
      loading: false,
      total: 0,
      userMenuTree: [],
      ids: []
    }
  },
  watch: {
    fatherShow(val) {
      if (val) {
        this.$nextTick(() => {
          this.getData()
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
    async getData() {
      try {
        this.loading = true
        const res = await getSllMenuTree()
        this.treeData = res.data
        this.loading = false
        this.getUserMenu()
      } catch (error) {}
    },
    async getUserMenu() {
      try {
        this.userMenuTree = await getRoleMenu(this.data.id).then(res => res.data)
        this.echo(this.userMenuTree)
      } catch (error) {}
    },
    confirm() {
      const ids = this.$refs.treeTable.getIds()
      const params = {
        roleId: this.data.id,
        menuIdList: ids
      }
      roleMenu(params).then(res => {
        if (res.code == 200) {
          this.$message.success('授权成功')
          this.close()
          this.$emit('refresh')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    echo(tree) {
      const ids = []
      const loop = function (tre) {
        tre.forEach(item => {
          ids.push(item.id)
          if (item.children?.length) {
            loop(item.children)
          }
        })
      }
      loop(tree)
      this.$refs.treeTable.toggleSelection(ids)
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
.flex-bot {
  margin-top: 30px;
  display: flex;
  justify-content: right;
}
.search {
  margin-bottom: 10px;
  display: flex;
  ::v-deep.el-input {
    border-radius: 5px 0 0 5px !important;
  }
}
</style>
