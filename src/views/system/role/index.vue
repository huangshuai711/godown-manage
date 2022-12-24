<template>
  <div class="commodity-info flex-col-box">
    <SearchFrom
      ref="search"
      :formData="formData"
      :btnArr="btnArr"
      @btnClick="operation"
    ></SearchFrom>
    <Table
      :tableRow="tableRow"
      :tableData="tableData"
      :loading="loading"
      @operateEvent="operateEvent"
      class="flex-fill"
    ></Table>
    <Pagination ref="page" :total="total" class="flex-bot"></Pagination>
    <Details ref="detail" v-model="detailsShow"></Details>
    <Edit ref="edit" v-model="editShow" @refresh="getData"></Edit>
    <Warrant ref="warrant" v-model="warrantShow" @refresh="getData"></Warrant>
  </div>
</template>

<script>
import SearchFrom from '@/components/searchFrom'
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import { getRoleList, exportRole, changeRoleState } from '@/api/system'
import { downloadFile } from '@/utils'
import Details from './components/details.vue'
import Edit from './components/edit.vue'
import Warrant from './components/warrant.vue'
export default {
  name: 'commodity-info',
  components: { SearchFrom, Table, Pagination, Details, Edit, Warrant },
  data() {
    return {
      formData: [
        {
          type: 'date',
          name: '更新时间',
          key: ['updateStartTime', 'updateEndTime'],
          value: []
        },
        {
          type: 'input',
          name: '角色名称',
          key: 'roleName',
          value: ''
        },
        {
          type: 'select',
          name: '角色状态',
          key: 'roleState',
          option: [
            { val: 1, text: '启用' },
            { val: 2, text: '禁用' }
          ],
          value: ''
        }
      ],
      btnArr: [
        { key: 'query', name: '查询' },
        { key: 'export', name: '导出' },
        { key: 'reset', name: '重置' },
        { key: 'add', name: '新增' }
      ],
      tableRow: [
        { key: 'roleName', label: '角色名称' },
        {
          key: 'roleState',
          label: '角色状态',
          dict: [
            { val: 1, text: '启用' },
            { val: 2, text: '禁用' }
          ]
        },
        { key: 'createDate', label: '更新时间' },
        {
          key: 'operate',
          label: '操作',
          btn: [
            { key: 'details', name: '详情' },
            { key: 'edit', name: '编辑' },
            { key: 'upDown', dict: { 1: '禁用', 2: '启用' }, link: 'roleState' },
            { key: 'delete', name: '删除' },
            { key: 'power', name: '菜单授权' }
          ]
        }
      ],
      tableData: [],
      total: 0,
      queryParam: {},
      loading: false,
      detailsShow: false,
      editShow: false,
      warrantShow: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    operation(key) {
      if (key == 'query') {
        this.query()
      } else if (key == 'reset') {
        this.reset()
      } else if (key == 'export') {
        this.export()
      } else if (key == 'add') {
        this.add()
      }
    },
    query() {
      this.queryParam = this.$refs.search.getValue()
      this.$refs.page.resetPageNum()
      this.getData()
    },
    reset() {
      this.$refs.search.reset()
    },
    async export() {
      try {
        const res = await exportRole(this.queryParam)
        downloadFile(res, '角色信息')
      } catch (error) {}
    },
    operateEvent(data) {
      if (data.key == 'details') {
        this.goDetails(data.row)
      } else if (data.key == 'edit') {
        this.edit(data.row)
      } else if (data.key == 'upDown') {
        this.changeState(data.row)
      } else if (data.key == 'delete') {
        this.delete(data.row)
      } else if (data.key == 'power') {
        this.power(data.row)
      }
    },
    power(row) {
      this.$refs.warrant.data = row
      this.warrantShow = true
    },
    goDetails(row) {
      this.$refs.detail.data = row
      this.detailsShow = true
    },
    add() {
      this.$refs.edit.data = null
      this.editShow = true
    },
    edit(row) {
      this.$refs.edit.data = row
      this.editShow = true
    },
    changeState(row) {
      const nowSta = row.roleState == 1 ? '禁用' : '启用'
      this.$confirm(`确认${nowSta}此角色？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          changeRoleState(row.id).then(res => {
            if (res.code == 200) {
              this.getData()
              this.$message.success(nowSta + '成功')
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(error => {})
    },
    delete(row) {
      this.$confirm(`确认删除此角色？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(row.id).then(res => {
          if (res.code == 200) {
            this.getData()
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    async getData() {
      try {
        this.loading = true
        const paging = this.$refs.page.getPage()
        const res = await getRoleList(this.queryParam, paging)
        this.tableData = res.data.records
        this.total = res.data.total
        this.loading = false
      } catch (error) {}
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
    overflow: auto;
  }
  .flex-bot {
    margin-bottom: 30px;
    display: flex;
    justify-content: right;
  }
}
</style>
