<template>
  <router-view v-if="isRouterAlive"></router-view>
</template>

<script>
export default {
  data() {
    return {
      isRouterAlive: true
    }
  },

  watch: {
    $route(to, from) {
      if (!['/user/login', '/user/signUp'].includes(to.path)) {
        let obj = {
          name: to.name,
          meta: to.meta
        }
        this.$store.commit('addTab', obj)
      }
    }
  },
  created() {}
}
</script>
<style></style>
