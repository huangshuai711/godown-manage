<template>
  <el-form :model="form" :rules="rules" ref="ruleForm" class="ruleForm" :class="{ default: !wrap }">
    <el-form-item prop="areaAddress">
      <el-cascader
        :options="areaSelectData"
        @change="handleChange"
        class="full-width"
        size="large"
        v-model="selectedOptions"
        placeholder="请选择您所在的城市"
        clearable
      />
    </el-form-item>
    <el-form-item prop="detailAddress">
      <el-input v-model="form.detailAddress" placeholder="详细地址" clearable></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
export default {
  model: {
    prop: 'address',
    event: 'addressChange'
  },
  props: {
    address: {
      type: String,
      default: ''
    },
    wrap: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedOptions: [],
      areaSelectData: regionData,
      form: {
        areaAddress: '',
        detailAddress: ''
      },
      rules: {
        areaAddress: [{ required: true, message: '请选择城市', trigger: 'change' }],
        detailAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
      }
    }
  },
  computed: {
    groupAddress: {
      get() {
        return this.form.areaAddress + this.form.detailAddress
      },
      set(val) {
        if (!val) return
        // 正则筛选出省区市
        const sqs = val.match(/.+?(省|市|自治区|自治州|县|区)/g)
        let provinceCode = ''
        let cityCode = ''
        let orgion = ''
        if (sqs) {
          sqs.forEach(item => {
            if (item.search(RegExp(/.*?(省|自治区|行政区|北京市|天津市|上海市|重庆市)/)) != -1) {
              provinceCode = item
            } else if (item.search(RegExp(/.*?(市|自治州|辖区)/)) != -1) {
              cityCode = item
            } else {
              orgion = item
            }
          })
          this.selectedOptions = [
            TextToCode[provinceCode]?.code || '',
            TextToCode[provinceCode]?.[cityCode]?.code || '',
            TextToCode[provinceCode]?.[cityCode]?.[orgion]?.code || ''
          ]
          this.form.areaAddress = provinceCode + cityCode + orgion
          this.form.detailAddress = val.split(sqs[sqs.length - 1])[1]
        } else {
          this.form.detailAddress = val
        }
      }
    }
  },
  watch: {
    address(val) {
      this.groupAddress = val
    },
    groupAddress(val) {
      this.$emit('addressChange', val)
    }
  },
  created() {
    this.groupAddress = this.address
  },
  methods: {
    handleChange(value) {
      const provinceCode = CodeToText[value[0]]
      const cityCode = CodeToText[value[1]]
      const orgion = CodeToText[value[2]]
      this.selectedOptions = [value[0], value[1], value[2]]
      this.form.areaAddress = provinceCode + cityCode + orgion
    },
    async validate() {
      let valid = await this.$refs.ruleForm.validate()
      return valid
    }
  }
}
</script>

<style lang="scss" scoped>
.ruleForm {
  width: 100%;
  .full-width {
    margin-bottom: 5px;
    width: 100%;
  }
}
.default {
  display: flex;
  .full-width {
    margin-right: 10px;
    margin-bottom: 0;
  }
}
</style>
