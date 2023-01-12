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
      :selection="true"
      ref="table"
      @operateEvent="operateEvent"
      class="flex-fill"
    >
      <template slot="num" slot-scope="{ index }">
        <el-input-number v-model="purchases[index].num" :min="0"></el-input-number>
      </template>
    </Table>
    <div class="floot-btn">
      <el-button type="primary" size="mini" @click="enter">确 认</el-button>
      <el-button type="primary" size="mini" @click="cancel">取 消</el-button>
    </div>
    <Pagination ref="page" :total="total" class="flex-bot"></Pagination>
  </div>
</template>

<script>
import SearchFrom from '@/components/searchFrom'
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import { getCommodityList, exportCommodity } from '@/api/baseData'
import { okpurchases } from '@/api/purchase'
import { downloadFile } from '@/utils'
export default {
  name: 'commodity-info',
  components: { SearchFrom, Table, Pagination },
  data() {
    return {
      formData: [
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
        { key: 'reset', name: '重置' }
      ],
      tableRow: [
        { key: 'productName', label: '商品名称' },
        { key: 'supplierName', label: '供应商' },
        { key: 'finalInventory', label: '库存数量' },
        { key: 'num', label: '进货数量', type: 'slot' }
      ],
      tableData: [],
      total: 0,
      queryParam: {},
      loading: false,
      detailsShow: false,
      editShow: false,
      purchases: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    enter() {
      this.$confirm(`确认进货？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const ids = this.$refs.table.getIds()
          const params = []
          this.purchases.map(item => {
            if (ids.includes(item.productId)) {
              params.push(JSON.parse(JSON.stringify(item)))
              item.num = 0
            }
          })
          okpurchases({ purchasesDtoList: params }).then(res => {
            if (res.code == 200) {
              this.$message.success('进货成功')
              this.getData()
            }
          })
        })
        .catch(() => {})
    },
    cancel() {
      this.purchases.map(item => {
        item.num = 0
      })
    },
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
        const res = await exportCommodity(this.queryParam)
        downloadFile(res, '商品信息')
      } catch (error) {}
    },
    operateEvent(data) {
      if (data.key == 'purchase') {
        this.goPurchase(data.row)
      }
    },

    goPurchase(row) {
      this.$refs.detail.data = row
      this.detailsShow = true
    },
    async getData() {
      try {
        this.loading = true
        const paging = this.$refs.page.getPage()
        const res = await getCommodityList(this.queryParam, paging)
        this.tableData = res.data.records
        this.purchases = []
        this.tableData.forEach(item => {
          this.purchases.push({ productId: item.id, num: 0 })
        })
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
.floot-btn {
  display: flex;
  justify-content: center;
}
</style>
