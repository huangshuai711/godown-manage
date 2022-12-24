<template>
  <div class="commodity-sort">
    <el-table
      :data="treeData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      v-loading="loading"
      ref="multiTable"
      border
      :expand-row-keys="[]"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @select="selectChange"
      @select-all="selectAllChange"
      @selection-change="selectionChangeHandler"
    >
      <el-table-column v-if="selection" type="selection" width="55"> </el-table-column>
      <el-table-column v-if="showIndex" label="#" type="index" width="50"> </el-table-column>
      <el-table-column
        v-for="item in treeRow"
        :key="item.key"
        :fixed="item.fixed"
        :label="item.label"
        :width="item.width"
        :prop="item.key"
        :default-expand-all="false"
      >
        <template slot-scope="scope">
          <template v-if="item.key == 'operate'">
            <el-dropdown trigger="click" @command="command => operateEvent(scope.row, command)">
              <el-button type="primary" size="mini">
                操 作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="btn in item.btn" :key="btn.key" :command="btn.key">{{
                  btn.name
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template v-else>
            <span>{{
              item.dict
                ? item.dict.find(dic => dic.val == scope.row[item.key]).text
                : scope.row[item.key]
            }}</span>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'commodity-sort',
  components: {},
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    treeRow: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selections: [],
      selectionsId: []
    }
  },
  mounted() {},
  methods: {
    operateEvent(row, key) {
      this.$emit('operateEvent', { row, key })
    },
    selectChange(selection, row) {
      // 如果selection中存在row代表是选中，否则是取消选中
      if (
        selection.find(val => {
          return this.getDataId(val) === this.getDataId(row)
        })
      ) {
        if (row.children) {
          //注意这里的children是后台返回数据的children字段
          row.children.forEach(val => {
            this.$refs.multiTable.toggleRowSelection(val, true)
            selection.push(val)
            if (val.children) {
              this.selectChange(selection, val)
            }
          })
        }
      } else {
        this.toggleRowSelection(selection, row)
      }
    },
    selectAllChange(selection) {
      // 如果选中的数目与请求到的数目相同就选中子节点，否则就清空选中
      if (selection && selection.length === this.treeData.length) {
        selection.forEach(val => {
          this.selectChange(selection, val)
        })
      } else {
        this.$refs.multiTable.clearSelection()
      }
    },
    toggleRowSelection(selection, data) {
      if (data.children) {
        //注意这里的children也是后台返回数据的children字段
        data.children.forEach(val => {
          this.$refs.multiTable.toggleRowSelection(val, false)
          if (val.children) {
            this.toggleRowSelection(selection, val)
          }
        })
      }
    },
    getDataId(data) {
      return data['id']
    },

    //数组去重
    unique(arr, i) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i].id == arr[j].id) {
            arr.splice(j, 1)
            j--
          }
        }
      }
    },
    // 选择改变
    selectionChangeHandler(val) {
      this.selections = val
      this.unique(this.selections, 'id') //这里有一个问题就是这样点选完之后，数据有重复，所以根据id手动去重，期待优化
      this.selectionsId = val.map(item => item?.id)
    },
    handleSelectionChange(val) {
      this.selections = val
      this.selectionsId = val.map(item => item?.id)
    },
    clearSelection(rows) {
      this.$refs.multipleTable.clearSelection()
    },
    getMultipleSelection() {
      return this.selections
    },
    getIds() {
      return this.selectionsId
    },
    toggleSelection(rows, tree = this.treeData) {
      tree.forEach(item => {
        const newRow = rows?.find(row => row.roleId == item.id)
        if (newRow) {
          this.$refs.multiTable.toggleRowSelection(newRow)
        }
        if (item.children?.length > 0) {
          this.toggleSelection(rows, item.children)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
