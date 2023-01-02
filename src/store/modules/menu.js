import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    editableTabsValue: 'homePage',
    editableTabs: [
      {
        title: '首页',
        name: 'home',
        icon: 'homePage'
      }
    ],
    menuTree: []
  },
  getters: {
    getMenuTree(state) {
      return state.menuTree
    }
  },
  mutations: {
    SET_MENUTREE: (state, menuTree) => {
      state.menuTree = menuTree
    },
    addTab(state, tab) {
      let index = state.editableTabs.findIndex(e => e.name === tab.name)

      if (index === -1) {
        state.editableTabs.push({
          title: tab.meta.title,
          name: tab.name
        })
      }
      state.editableTabsValue = tab.name
    },
    resetState: state => {
      state.editableTabsValue = 'homePage'
      state.editableTabs = [
        {
          title: '首页',
          name: 'homePage'
        }
      ]
    }
  }
}
