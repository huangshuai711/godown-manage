<template>
  <div class="commodity-info flex-col-box">
    <SearchFrom
      ref="search"
      :formData="formData"
      :btnArr="btnArr"
      @btnClick="operation"
      labelWidth="120px"
    >
      <template slot="Import" slot-scope="{ btn }">
        <el-upload
          class="upload-demo"
          :action="upLoadFileUrl"
          :show-file-list="false"
          :before-upload="file => beforeUpload(file, btn)"
          ><el-button size="mini" type="primary">{{ btn.name }}</el-button>
        </el-upload>
      </template>
    </SearchFrom>
    <Table
      :tableRow="tableRow"
      :tableData="tableData"
      :loading="loading"
      @operateEvent="operateEvent"
      class="flex-fill"
    ></Table>
    <Pagination ref="page" :total="total" class="flex-bot" @refresh="getData"></Pagination>
    <Details ref="detail" v-model="detailsShow"></Details>
    <Edit ref="edit" v-model="editShow" @refresh="getData"></Edit>
  </div>
</template>

<script>
import SearchFrom from '@/components/searchFrom'
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import {
  getSuppliersList,
  exportSuppliers,
  changeSuppliersState,
  importSupplier
} from '@/api/baseData'
import { downloadFile } from '@/utils'
import Details from './components/details.vue'
import Edit from './components/edit.vue'
export default {
  name: 'commodity-info',
  components: { SearchFrom, Table, Pagination, Details, Edit },
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
          name: '供应商名称',
          key: 'supplierName',
          value: ''
        },
        {
          type: 'input',
          name: '供应商负责人名称',
          key: 'supplierUsername',
          value: ''
        },
        {
          type: 'input',
          name: '供应商负责人电话',
          key: 'supplierPhone',
          value: ''
        },
        {
          type: 'input',
          name: '供应商地址',
          key: 'supplierAddress',
          value: ''
        },
        {
          type: 'select',
          name: '状态',
          key: 'supplierStatus',
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
        { key: 'add', name: '新增供应商' },
        { key: 'Import', name: '导入', slot: true }
      ],
      tableRow: [
        { key: 'supplierName', label: '供应商名称' },
        { key: 'supplierUsername', label: '负责人名称' },
        { key: 'supplierPhone', label: '负责人电话' },
        { key: 'supplierAddress', label: '供应商地址' },
        {
          key: 'supplierStatus',
          label: '状态',
          dict: [
            { val: 1, text: '启用' },
            { val: 2, text: '禁用' }
          ]
        },
        { key: 'updateTime', label: '更新时间' },
        {
          key: 'operate',
          label: '操作',
          btn: [
            { key: 'details', name: '详情' },
            { key: 'edit', name: '编辑' },
            { key: 'openCl', dict: { 2: '启用', 1: '禁用' }, link: 'supplierStatus' },
            { key: 'remove', name: '删除' }
          ]
        }
      ],
      tableData: [],
      total: 0,
      queryParam: {},
      loading: false,
      detailsShow: false,
      editShow: false,
      upLoadFileUrl: ''
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
      } else {
        this.Import()
      }
    },

    beforeUpload(file, btn, list) {
      const formData = new FormData()
      formData.append('file', file)
      importSupplier(formData)
        .then(res => {
          if (res.code == 200) {
            this.$message.success('导入成功')
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.$message.error('格式错误')
        })
      return false
    },
    query() {
      this.queryParam = this.$refs.search.getValue()
      this.$refs.page.resetPageNum()
      this.getData()
    },
    Import() {},
    reset() {
      this.$refs.search.reset()
    },
    async export() {
      try {
        const res = await exportSuppliers(this.queryParam)
        downloadFile(res, '供应商信息')
      } catch (error) {}
    },
    add() {
      this.$refs.edit.data = null
      this.editShow = true
    },
    operateEvent(data) {
      if (data.key == 'details') {
        this.goDetails(data.row)
      } else if (data.key == 'edit') {
        this.edit(data.row)
      } else if (data.key == 'openCl') {
        this.openCl(data.row)
      }
    },

    goDetails(row) {
      this.$refs.detail.data = row
      this.detailsShow = true
    },
    edit(row) {
      this.$refs.edit.data = row
      this.editShow = true
    },
    openCl(row) {
      const nowSta = row.clientStatus == 1 ? '禁用' : '启用'
      this.$confirm(`确认${nowSta}此客户？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          changeSuppliersState(row.id).then(res => {
            if (res.code == 200) {
              this.getData()
              this.$message.success(nowSta + '成功')
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(() => {})
    },
    async getData() {
      try {
        this.loading = true
        const paging = this.$refs.page.getPage()
        const res = await getSuppliersList(this.queryParam, paging)
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
