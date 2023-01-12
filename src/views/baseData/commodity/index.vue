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
    <Pagination ref="page" :total="total" class="flex-bot" @refresh="getData"></Pagination>
    <Details ref="detail" v-model="detailsShow"></Details>
    <Edit ref="edit" v-model="editShow" @refresh="getData"></Edit>
  </div>
</template>

<script>
import SearchFrom from '@/components/searchFrom'
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import { getCommodityList, exportCommodity } from '@/api/baseData'
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
          name: '商品名称',
          key: 'productName',
          value: ''
        },
        {
          type: 'input',
          name: '供应商',
          key: 'supplierName',
          value: ''
        }
      ],
      btnArr: [
        { key: 'query', name: '查询' },
        { key: 'export', name: '导出' },
        { key: 'reset', name: '重置' },
        { key: 'add', name: '新增商品' }
      ],
      tableRow: [
        { key: 'productName', label: '商品名称' },
        { key: 'supplierName', label: '供应商' },
        { key: 'openingInventory', label: '期初库存' },
        { key: 'finalInventory', label: '期末库存' },
        { key: 'productPrice', label: '价格' },
        { key: 'updateTime', label: '更新时间' },
        {
          key: 'operate',
          label: '操作',
          btn: [
            { key: 'details', name: '详情' },
            { key: 'edit', name: '编辑' }
          ]
        }
      ],
      tableData: [],
      total: 0,
      queryParam: {},
      loading: false,
      detailsShow: false,
      editShow: false
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
        const res = await exportCommodity(this.queryParam)
        downloadFile(res, '商品信息')
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
    async getData() {
      try {
        this.loading = true
        const paging = this.$refs.page.getPage()
        const res = await getCommodityList(this.queryParam, paging)
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
