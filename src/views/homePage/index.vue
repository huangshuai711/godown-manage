<template>
  <div class="homePage">
    <div ref="echart1" class="echart"></div>
    <div ref="echart11" class="echart"></div>
    <div ref="echart2" class="echart"></div>
    <div ref="echart21" class="echart"></div>
    <div ref="echart3" class="echart"></div>
    <div ref="echart31" class="echart"></div>
    <div ref="echart4" class="echart"></div>
    <div ref="echart41" class="echart"></div>
    <div ref="echart5" class="echart"></div>
    <div ref="echart51" class="echart"></div>
  </div>
</template>

<script>
import { getPictures } from '@/api/pictureManage'
import {
  getWarningList,
  getPurchaseList,
  getSellList,
  getDayList,
  getMonthList
} from '@/api/baseData'
import * as echarts from 'echarts'
export default {
  name: 'homePage',
  data() {
    return {
      imgArr: []
    }
  },
  components: {},
  mounted() {
    this.getWarningLists()
    this.getPurchaseLists()
    this.getSellLists()
    this.getDayLists()
    this.getMonthLists()
  },
  methods: {
    async getWarningLists() {
      try {
        const res = await getWarningList()
        this.imgArr = res.data
      } catch (error) {}
    },
    async getWarningLists() {
      try {
        const res = await getWarningList()
        const names = []
        const values = []
        res.data.forEach(item => {
          names.push(item.productName || '')
          values.push(item.num || 1)
        })
        this.$nextTick(() => {
          var myChart1 = echarts.init(this.$refs.echart1)
          var myChart2 = echarts.init(this.$refs.echart11)
          myChart1.setOption({
            title: {
              text: '预警统计表'
            },
            tooltip: {},
            xAxis: {
              data: names
            },
            yAxis: {},
            series: [
              {
                name: '收藏',
                type: 'bar',
                data: values
              }
            ]
          })
          myChart2.setOption({
            xAxis: {
              type: 'category',
              data: names
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: values,
                type: 'line'
              }
            ]
          })
        })
      } catch (error) {}
    },
    async getPurchaseLists() {
      try {
        const res = await getPurchaseList()
        const names = []
        const values = []
        res.data.forEach(item => {
          names.push(item.productName)
          values.push(item.num)
        })
        this.$nextTick(() => {
          var myChart1 = echarts.init(this.$refs.echart2)
          var myChart2 = echarts.init(this.$refs.echart21)
          myChart1.setOption({
            title: {
              text: '采购统计列表'
            },
            tooltip: {},
            xAxis: {
              data: names
            },
            yAxis: {},
            series: [
              {
                name: '销量',
                type: 'bar',
                data: values
              }
            ]
          })
          myChart2.setOption({
            xAxis: {
              type: 'category',
              data: names
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: values,
                type: 'line'
              }
            ]
          })
        })
      } catch (error) {}
    },
    async getSellLists() {
      try {
        const res = await getSellList()
        const names = []
        const values = []
        res.data.forEach(item => {
          names.push(item.productName || '')
          values.push(item.num)
        })
        this.$nextTick(() => {
          var myChart1 = echarts.init(this.$refs.echart3)
          var myChart2 = echarts.init(this.$refs.echart31)
          myChart1.setOption({
            title: {
              text: '销售统计列表'
            },
            tooltip: {},
            xAxis: {
              data: names
            },
            yAxis: {},
            series: [
              {
                name: '销量',
                type: 'bar',
                data: values
              }
            ]
          })
          myChart2.setOption({
            xAxis: {
              type: 'category',
              data: names
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: values,
                type: 'line'
              }
            ]
          })
        })
      } catch (error) {}
    },
    async getDayLists() {
      try {
        const res = await getDayList()
        const names = []
        const values = []
        res.data.forEach(item => {
          names.push(item.productName || '')
          values.push(item.num)
        })
        this.$nextTick(() => {
          var myChart1 = echarts.init(this.$refs.echart4)
          var myChart2 = echarts.init(this.$refs.echart41)
          myChart1.setOption({
            title: {
              text: '按日统计列表'
            },
            tooltip: {},
            xAxis: {
              data: names
            },
            yAxis: {},
            series: [
              {
                name: '销量',
                type: 'bar',
                data: values
              }
            ]
          })
          myChart2.setOption({
            xAxis: {
              type: 'category',
              data: names
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: values,
                type: 'line'
              }
            ]
          })
        })
      } catch (error) {}
    },
    async getMonthLists() {
      try {
        const res = await getMonthList()
        const names = []
        const values = []
        res.data.forEach(item => {
          names.push(item.productName || '')
          values.push(item.num)
        })
        this.$nextTick(() => {
          var myChart1 = echarts.init(this.$refs.echart5)
          var myChart2 = echarts.init(this.$refs.echart51)
          myChart1.setOption({
            title: {
              text: '按月统计列表'
            },
            tooltip: {},
            xAxis: {
              data: names
            },
            yAxis: {},
            series: [
              {
                name: '销量',
                type: 'bar',
                data: values
              }
            ]
          })
          myChart2.setOption({
            xAxis: {
              type: 'category',
              data: names
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: values,
                type: 'line'
              }
            ]
          })
        })
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.homePage {
  height: 100%;
  overflow: auto;
}
::v-deep .el-carousel__container {
  height: auto;
}
::v-deep .el-carousel__container:before {
  content: ' ';
  display: block;
  padding-top: 40%;
}
::v-deep .el-carousel {
  position: relative;
  .img-box {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      margin: auto;
    }
  }
}
::v-deep .el-carousel__item:nth-child(n) {
  background-color: #99a9bf;
}
.echart {
  width: 50%;
  height: 500px;
  display: inline-block;
  margin: 30px 0 0;
}
</style>
