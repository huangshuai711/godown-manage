<template>
  <div>
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="clickTab"
    >
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'tab',
  data() {
    return {}
  },
  computed: {
    editableTabs: {
      get() {
        return this.$store.state.menu.editableTabs
      },
      set(val) {
        this.$store.state.menu.editableTabs = val
      }
    },
    editableTabsValue: {
      get() {
        return this.$store.state.menu.editableTabsValue
      },
      set(val) {
        this.$store.state.menu.editableTabsValue = val
      }
    }
  },
  methods: {
    removeTab(targetName) {
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === 'homePage') {
        return
      }
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
        this.$router.push({ name: activeName })
      }
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    },
    clickTab(target) {
      this.$router.push({ name: target.name })
    }
  }
}
</script>
