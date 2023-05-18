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
  </div>
</template>

<script>
import SearchFrom from '@/components/searchFrom'
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import { getStrategyData, importStrtegy } from '@/api/strategyManage'
export default {
  name: 'commodity-info',
  components: { SearchFrom, Table, Pagination },
  data() {
    return {
      formData: [
        {
          type: 'date',
          name: '创建时间',
          key: ['updateStartTime', 'updateEndTime'],
          value: []
        },
        {
          type: 'input',
          name: '名称',
          key: 'productName',
          value: ''
        },
        {
          type: 'input',
          name: '区域',
          key: 'productName',
          value: ''
        }
      ],
      btnArr: [
        { key: 'query', name: '查询' },
        { key: 'reset', name: '重置' },
        { key: 'Import', name: '导入', slot: true }
      ],
      tableRow: [
        { key: 'smokeName', label: '名称' },
        { key: 'smokeSource', label: '货源属性' },
        { key: 'oneId', label: '区域' },
        { key: 'twoId', label: '区域' },
        { key: 'weekNum', label: '周数' },
        { key: 'createTime', label: '创建时间' }
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
      } else if (key == 'add') {
        this.add()
      } else {
        this.Import()
      }
    },
    add() {
      this.$refs.edit.data = null
      this.editShow = true
    },
    beforeUpload(file, btn, list) {
      const formData = new FormData()
      formData.append('multipartFile', file)
      importStrtegy(formData)
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
    add() {
      this.$refs.edit.data = null
      this.editShow = true
    },
    remove() {
      this.$confirm(`确认删除？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          removeNotice(row.id).then(res => {
            if (res.code == 200) {
              this.$message.success(`删除成功`)
              this.getData()
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(() => {})
    },
    operateEvent(data) {
      if (data.key == 'details') {
        this.goDetails(data.row)
      } else if (data.key == 'edit') {
        this.edit(data.row)
      } else if (data.key == 'remove') {
        this.remove(data.row)
      }
    },

    async goDetails(row) {
      this.$refs.detail.data = await getNoticeDetails(row.id).then(res => res.data)
      this.detailsShow = true
    },
    edit(row) {
      this.$refs.edit.data = row
      this.editShow = true
    },
    async getData() {
      // try {
      this.loading = true
      const paging = this.$refs.page.getPage()
      const res = await getStrategyData(this.queryParam, paging)
      this.tableData = res.data.records
      this.total = res.data.total
      this.loading = false
      // } catch (error) {}
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
