<template>
  <el-menu
    :default-active="editableTabsValue"
    class="el-menu-vertical-demo"
    background-color="#ff6000"
    text-color="hsla(0,0%,100%,.65)"
    :router="true"
    :default-openeds="defaultOpeneds"
    active-text-color="#fff"
  >
    <template v-for="item in menuList">
      <el-submenu v-if="item?.children" :index="item?.path">
        <template slot="title"> <Icon></Icon>{{ item.meta.title }} </template>
        <el-menu-item
          v-for="itemc in item?.children"
          :key="itemc?.path"
          :index="itemc?.path"
          @click="selectMenu(itemc)"
          :route="itemc?.path"
          >{{ itemc?.meta.title }}</el-menu-item
        >
      </el-submenu>

      <el-menu-item v-else :index="item?.path" @click="selectMenu(item)" :route="item?.path">
        <template slot="title"> <Icon></Icon>{{ item?.meta.title }} </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
import { menuList } from '@/config/menu'
export default {
  data() {
    return {
      menuList: menuList
    }
  },
  computed: {
    editableTabsValue() {
      return this.$route?.path
    },
    defaultOpeneds() {
      return this.menuList
        .filter(item => item?.children)
        .map(item => {
          return item?.path
        })
    }
  },
  methods: {
    selectMenu(item) {
      this.$store.commit('addTab', item)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-submenu .el-menu-item {
  padding-left: 50px !important;
}
::v-deep .el-menu-item.is-active {
  background: linear-gradient(to right, #ff7000 0%, #fff 100%) !important;
}
::v-deep .el-menu-item:hover {
  background: linear-gradient(to right, #ff7000 0%, #fff 100%) !important;
}
::v-deep .el-submenu .el-submenu__title:hover {
  background-color: #ff7000 !important;
}
</style>
