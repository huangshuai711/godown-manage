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
  </div>
</template>

<script>
import SearchFrom from '@/components/searchFrom'
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import { getPurchasesList, exportPurchases, getdjDetails } from '@/api/purchase'
import { downloadFile } from '@/utils'
import Details from './components/details.vue'
export default {
  name: 'commodity-info',
  components: { SearchFrom, Table, Pagination, Details },
  data() {
    return {
      formData: [
        {
          type: 'date',
          name: '进货时间',
          key: ['updateStartTime', 'updateEndTime'],
          value: []
        },
        {
          type: 'input',
          name: '进货单据号',
          key: 'documentNum',
          value: ''
        },
        {
          type: 'input',
          name: '进货人姓名',
          key: 'username',
          value: ''
        }
      ],
      btnArr: [
        { key: 'query', name: '查询' },
        { key: 'export', name: '导出' },
        { key: 'reset', name: '重置' }
      ],
      tableRow: [
        { key: 'documentNum', label: '进货单据号' },
        { key: 'createUserName', label: '进货人姓名' },
        { key: 'totalCount', label: '进货总数量' },
        { key: 'createTime', label: '进货时间' },
        {
          key: 'operate',
          label: '操作',
          btn: [{ key: 'details', name: '详情' }]
        }
      ],
      tableData: [],
      total: 0,
      queryParam: {},
      loading: false,
      detailsShow: false
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
        const res = await exportPurchases(this.queryParam)
        downloadFile(res, '单据信息')
      } catch (error) {}
    },
    add() {
      this.$refs.edit.data = null
      this.editShow = true
    },
    operateEvent(data) {
      if (data.key == 'details') {
        this.goDetails(data.row)
      }
    },

    async goDetails(row) {
      this.$refs.detail.data = await getdjDetails(row.id).then(res => res.data)
      this.detailsShow = true
    },
    async getData() {
      try {
        this.loading = true
        const paging = this.$refs.page.getPage()
        const res = await getPurchasesList({ ...this.queryParam, documentType: 1 }, paging)
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
