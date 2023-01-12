<template>
  <div class="homePage">
    <div>
      <div ref="echart1" class="echart"></div>
    </div>
    <div>
      <div ref="echart4" class="echart"></div>
      <div ref="echart41" class="echart"></div>
    </div>
    <div>
      <div ref="echart5" class="echart"></div>
      <div ref="echart51" class="echart"></div>
    </div>
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
                data: values,
                itemStyle: {
                  normal: {
                    color: function () {
                      return '#' + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16)
                    }
                  }
                }
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
        const prices = []
        const data = []
        res.data.forEach(item => {
          names.push(item.productName)
          values.push(item.num)
          prices.push(item.price)
          data.push({ value: item.num || 0, name: item.productName || '' })
        })
        this.$nextTick(() => {
          var myChart1 = echarts.init(this.$refs.echart4)
          var myChart2 = echarts.init(this.$refs.echart41)
          myChart1.setOption({
            title: {
              text: '按日统计列表'
            },
            tooltip: {
              formatter: function (arg, ind) {
                return `销量: ${arg.data}
                金额: ${prices[arg.dataIndex]}`
              }
            },
            xAxis: {
              data: names
            },
            yAxis: {},
            series: [
              {
                name: '销量',
                type: 'bar',
                data: values,
                itemStyle: {
                  normal: {
                    color: function () {
                      return '#' + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16)
                    }
                  }
                }
              }
            ]
          })
          myChart2.setOption({
            legend: {
              top: 'bottom'
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            tooltip: {
              formatter: function (arg, ind) {
                return `销量: ${arg.data.value}
                金额: ${prices[arg.dataIndex]}`
              }
            },
            series: [
              {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [50, 180],
                center: ['50%', '38%'],
                roseType: 'area',
                itemStyle: {
                  borderRadius: 8,
                  normal: {
                    labelLine: {
                      length: 10
                    }
                  }
                },
                data: data
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
        const prices = []
        const data = []
        res.data.forEach(item => {
          names.push(item.productName || '')
          values.push(item.num)
          prices.push(item.price)
          data.push({ value: item.num || 0, name: item.productName || '' })
        })
        this.$nextTick(() => {
          var myChart1 = echarts.init(this.$refs.echart5)
          var myChart2 = echarts.init(this.$refs.echart51)
          myChart1.setOption({
            title: {
              text: '按月统计列表'
            },
            tooltip: {
              formatter: function (arg, ind) {
                return `销量: ${arg.data}
                金额: ${prices[arg.dataIndex]}`
              }
            },
            xAxis: {
              data: names
            },
            yAxis: {},
            series: [
              {
                name: '销量',
                type: 'bar',
                data: values,
                itemStyle: {
                  normal: {
                    color: function () {
                      return '#' + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16)
                    }
                  }
                }
              }
            ]
          })
          myChart2.setOption({
            legend: {
              top: 'bottom'
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: { show: true }
              }
            },
            tooltip: {
              formatter: function (arg, ind) {
                return `销量: ${arg.data.value}
                金额: ${prices[arg.dataIndex]}`
              }
            },
            series: [
              {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [50, 180],
                center: ['50%', '38%'],
                roseType: 'area',
                itemStyle: {
                  borderRadius: 8,
                  normal: {
                    labelLine: {
                      length: 10
                    }
                  }
                },
                data: data
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
