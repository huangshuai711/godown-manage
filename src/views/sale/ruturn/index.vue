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
        <el-form>
          <el-form-item :error="purchases[index].nerror">
            <el-input-number
              v-model="purchases[index].num"
              @change="tableNumChange(index)"
              :min="0"
            ></el-input-number>
          </el-form-item>
        </el-form>
      </template>
      <template slot="target" slot-scope="{ index }">
        <el-form>
          <el-form-item :error="purchases[index].cerror">
            <el-select
              v-model="purchases[index].clientId"
              filterable
              remote
              @change="tableClientChange(index)"
              reserve-keyword
              placeholder="请选择客户"
              :remote-method="remoteMethod"
              :loading="loadings"
            >
              <el-option
                v-for="item in clientList"
                :key="item.id"
                :label="item.clientName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </Table>
    <Pagination ref="page" :total="total" class="flex-bot" @refresh="getData"></Pagination>
  </div>
</template>

<script>
import SearchFrom from '@/components/searchFrom'
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import { getCommodityList, exportCommodity } from '@/api/baseData'
import { getClientList } from '@/api/baseData'
import { saleIssue } from '@/api/purchase'
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
        { key: 'reset', name: '重置' },
        { key: 'return', name: '销售出库' }
      ],
      tableRow: [
        { key: 'productName', label: '商品名称' },
        { key: 'supplierName', label: '供应商' },
        { key: 'finalInventory', label: '库存数量' },
        { key: 'target', label: '目标客户', type: 'slot' },
        { key: 'num', label: '销售数量', type: 'slot' }
      ],
      tableData: [],
      total: 0,
      queryParam: {},
      loading: false,
      detailsShow: false,
      editShow: false,
      purchases: [],
      clientList: [],
      loadings: false
    }
  },
  mounted() {
    this.getData()
    this.remoteMethod()
  },
  methods: {
    tableNumChange(index) {
      if (this.purchases[index].num) {
        this.$set(this.purchases[index], 'nerror', '')
      }
    },
    tableClientChange(index) {
      if (this.purchases[index].clientId) {
        this.$set(this.purchases[index], 'cerror', '')
      }
    },
    async remoteMethod(query) {
      this.loadings = true
      this.clientList = await getClientList(
        { clientName: query || '' },
        { pageNum: 1, pageSize: 100 }
      ).then(res => res.data.records)
      this.loadings = false
    },
    enter() {
      this.$confirm(`确认出库？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const ids = this.$refs.table.getIds()
          const params = []
          let error = 0
          this.purchases.map(item => {
            if (ids.includes(item.productId)) {
              if (!item.num) {
                item.nerror = '请添加数量'
                error++
              }
              if (!item.clientId) {
                item.cerror = '请选择用户'
                error++
              }
              params.push(JSON.parse(JSON.stringify(item)))
            }
          })
          if (error) {
            return
          }
          this.purchases.map(item => {
            item.num = 0
          })
          saleIssue({ purchasesDtoList: params }).then(res => {
            if (res.code == 200) {
              this.$message.success('出库成功')
              this.getData()
              this.cancel()
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
      } else if (key == 'return') {
        this.enter()
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
          this.purchases.push({ productId: item.id, num: 0, clientId: '', nerror: '', cerror: '' })
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
