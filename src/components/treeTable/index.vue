<template>
  <div class="commodity-sort">
    <el-table
      :data="treeData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      v-loading="loading"
      border
      :expand-row-keys="[]"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
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
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    operateEvent(row, key) {
      this.$emit('operateEvent', { row, key })
    }
  }
}
</script>
<style lang="scss" scoped></style>
