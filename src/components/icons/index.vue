<template>
  <img
    class="icon"
    v-if="iconKey[type]?.type == 'img'"
    :src="iconKey[type]?.value"
    alt=""
    :style="{ width, height }"
  />
  <img class="icon" v-else :src="iconKey[type]?.value" alt="" :style="{ width, height }" />
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'home'
    },
    width: {
      type: String,
      default: '18px'
    },
    height: {
      type: String,
      default: '18px'
    }
  },
  data() {
    return {
      iconKey: {
        home: { type: 'img', value: require('@/assets/icon/home.png') },
        collYes: { type: 'img', value: require('@/assets/icon/collect-yes.png') },
        collNo: { type: 'img', value: require('@/assets/icon/collect-no.png') }
      }
    }
  },
  computed: {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.icon {
  position: relative;
  padding: 0 5px;
  vertical-align: text-top;
}
</style>
