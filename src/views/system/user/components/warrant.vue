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
    <div class="search">
      <el-input class="form-inp" placeholder="请输入" v-model="searchText"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <Table
      :tableRow="tableRow"
      :tableData="tableData"
      ref="table"
      :loading="loading"
      :showIndex="false"
      :selection="true"
      class="flex-fill"
    ></Table>
    <Pagination ref="page" :total="total" class="flex-bot"></Pagination>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm">确 认</el-button>
      <el-button @click="close">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import { getRoleList, userRole } from '@/api/system'
export default {
  components: { Table, Pagination },
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
      title: '角色授权',
      tableRow: [{ key: 'roleName', label: '角色名称' }],
      tableData: [],
      loading: false,
      total: 0,
      searchText: '',
      queryParam: {}
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
    search() {
      this.queryParam = { username: this.searchText }
      this.getData()
    },
    close() {
      this.$emit('shoChange', false)
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
    },
    confirm() {
      const ids = this.$refs.table.getIds()
      const params = {
        userId: this.data.id,
        roleIdList: ids
      }
      userRole(params).then(res => {
        if (res.code == 200) {
          this.$message.success('授权成功')
          this.close()
          this.$emit('refresh')
        } else {
          this.$message.error(res.msg)
        }
      })
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
  margin: 30px 0;
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
