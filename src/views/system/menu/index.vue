<template>
  <div class="commodity-sort flex-col-box">
    <div class="top-btn">
      <el-button size="mini" type="primary" @click="add">新增菜单分类</el-button>
    </div>
    <TreeTable
      :treeRow="treeRow"
      :treeData="treeData"
      :loading="loading"
      @operateEvent="operateEvent"
      class="flex-fill"
    ></TreeTable>
    <EidtAdd ref="editAdd" v-model="editAddShow" @refresh="getData"></EidtAdd>
  </div>
</template>

<script>
import TreeTable from '@/components/treeTable'
import { getSllMenuTree, removeMenu, editMenuStatus } from '@/api/system'
import EidtAdd from './components/eidtAdd.vue'
export default {
  name: 'commodity-sort',
  components: { TreeTable, EidtAdd },
  data() {
    return {
      treeRow: [
        { key: 'name', label: '类型' },
        {
          key: 'menuState',
          label: '启用状态',
          dict: [
            { val: 1, text: '启用' },
            { val: 2, text: '禁用' }
          ]
        },
        {
          key: 'operate',
          label: '操作',
          btn: [
            { key: 'edit', name: '编辑' },
            { key: 'delete', name: '删除' },
            { key: 'addPeer', name: '添加同级菜单' },
            { key: 'addSub', name: '添加子级菜单' },
            // { key: 'addSub', dict: { 2: '上架', 1: '下架' }, link: 'productStatus' },
            { key: 'revive', dict: { 2: '启用菜单', 1: '禁用菜单' }, link: 'menuState' }
          ]
        }
      ],
      treeData: [],
      loading: false,
      editAddShow: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        this.loading = true
        const res = await getSllMenuTree()
        this.treeData = res.data
        this.loading = false
      } catch (error) {}
    },
    operateEvent(data) {
      this[data.key](data.row)
    },
    add() {
      this.$refs.editAdd.data = null
      this.$refs.editAdd.treeData = [{ id: '', name: '根目录' }, ...this.treeData]
      this.editAddShow = true
    },
    edit(row) {
      this.$refs.editAdd.data = row
      this.$refs.editAdd.treeData = [{ id: '', name: '根目录' }, ...this.treeData]
      this.editAddShow = true
    },
    delete(row) {
      this.$confirm(`确认删除此菜单？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeMenu(row.id).then(res => {
          if (res.code == 200) {
            this.getData()
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    addPeer(row) {
      this.$refs.editAdd.data = { pid: row.pid }
      this.$refs.editAdd.treeData = this.treeData
      this.editAddShow = true
    },
    addSub(row) {
      this.$refs.editAdd.data = { pid: row.id }
      this.$refs.editAdd.treeData = this.treeData
      this.editAddShow = true
    },
    revive(row) {
      const text = row.menuState == 1 ? '禁用' : '启用'
      this.$confirm(`确认${text}此菜单？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editMenuStatus({ menuId: row.id }).then(res => {
          if (res.code == 200) {
            this.getData()
            this.$message.success(`${text}成功`)
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.flex-col-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  .flex-fill {
    margin: 30px 0;
    flex: 1;
    overflow: auto;
  }
  .flex-bot {
    margin-bottom: 30px;
    display: flex;
    justify-content: right;
  }
}
</style>
