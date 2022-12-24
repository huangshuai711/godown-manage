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
import { getUserList, exports, changeUserState, deleteUser } from '@/api/system'
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
          name: '用户名称',
          key: 'username',
          value: ''
        },
        {
          type: 'input',
          name: '联系电话',
          key: 'telephone',
          value: ''
        },
        {
          type: 'input',
          name: '用户邮箱',
          key: 'email',
          value: ''
        },
        {
          type: 'select',
          name: '用户状态',
          key: 'userStatus',
          option: this.$dict.system.userStatus,
          value: ''
        },
        {
          type: 'input',
          name: '居住地址',
          key: 'address',
          value: ''
        }
      ],
      btnArr: [
        { key: 'query', name: '查询' },
        { key: 'export', name: '导出' },
        { key: 'reset', name: '重置' }
      ],
      tableRow: [
        { key: 'username', label: '用户名称' },
        { key: 'avatar', label: '用户头像', type: 'imger' },
        { key: 'telephone', label: '联系电话' },
        { key: 'email', label: '用户邮箱' },
        { key: 'userStatus', label: '用户状态', dict: this.$dict.system.userStatus },
        { key: 'address', label: '居住地址' },
        { key: 'updateTime', label: '更新时间' },
        {
          key: 'operate',
          label: '操作',
          btn: [
            { key: 'details', name: '详情' },
            { key: 'edit', name: '编辑' },
            { key: 'upDown', dict: { 1: '禁用', 2: '启用' }, link: 'userStatus' },
            { key: 'delete', name: '删除' },
            { key: 'warrant', name: '角色授权' }
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
        const res = await exports(this.queryParam)
        downloadFile(res, '用户信息')
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
      } else if (data.key == 'warrant') {
        this.warrant(data.row)
      }
    },
    warrant(row) {
      this.$refs.warrant.data = row
      this.warrantShow = true
    },
    goDetails(row) {
      this.$refs.detail.data = row
      this.detailsShow = true
    },
    edit(row) {
      this.$refs.edit.data = row
      this.editShow = true
    },
    changeState(row) {
      const nowSta = row.userStatus == 1 ? '禁用' : '启用'
      this.$confirm(`确认${nowSta}此账户？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        changeUserState(row.id).then(res => {
          if (res.code == 200) {
            this.getData()
            this.$message.success(nowSta + '成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    delete(row) {
      this.$confirm(`确认删除此账户？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(row.id).then(res => {
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
        const res = await getUserList(this.queryParam, paging)
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
