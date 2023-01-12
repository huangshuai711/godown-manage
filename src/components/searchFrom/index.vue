<template>
  <div>
    <el-form class="form" ref="form" :label-width="labelWidth" label-position="left">
      <template v-for="item in formData">
        <el-form-item class="form-item" v-if="item.type == 'input'" :label="item.name">
          <el-input class="form-inp" placeholder="请输入" v-model="item.value"></el-input>
        </el-form-item>
        <el-form-item class="form-item" v-else-if="item.type == 'select'" :label="item.name">
          <el-select class="form-inp" v-model="item.value" placeholder="请选择">
            <el-option
              :label="opt.text"
              v-for="opt in item.option"
              :key="opt.val"
              :value="opt.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" v-else-if="item.type == 'date'" :label="item.name">
          <el-date-picker
            class="form-inp"
            v-model="item.value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </template>
    </el-form>
    <div>
      <div class="btn-box" v-for="btn in btnArr" :key="btn.key">
        <slot v-if="btn.slot" :name="btn.key" :btn="btn"></slot>
        <el-button v-else size="mini" type="primary" @click="btnClick(btn)">{{
          btn.name
        }}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    formData: {
      type: Array,
      default: () => []
    },
    btnArr: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    getValue() {
      const pream = {}
      this.formData.forEach(item => {
        if (item.type == 'date') {
          if (item.value) {
            item.value[0] && (pream[item.key[0]] = item.value[0])
            item.value[1] && (pream[item.key[1]] = item.value[1])
          }
        } else {
          item.value && (pream[item.key] = item.value)
        }
      })
      return pream
    },
    reset() {
      this.formData.map(item => {
        if (item.type == 'date') {
          item.value = []
        } else {
          item.value = ''
        }
      })
    },
    btnClick(btn) {
      this.$emit('btnClick', btn.key)
    }
  }
}
</script>
<style lang="scss" scoped>
.form {
  display: flex;
  flex-wrap: wrap;
  .form-item {
    width: 350px;
    margin-right: 20px;
    .form-inp {
      width: 100%;
    }
  }
}
.btn-box {
  display: inline-block;
  margin-right: 10px;
}
</style>
