export const menuList = [
  {
    name: 'system',
    path: '/system',
    meta: { title: '系统管理', icon: 'setting' },
    children: [
      {
        name: 'systemMenu',
        path: '/system/menu',
        component: '/system/menu',
        meta: { title: '菜单管理', icon: false }
      },
      {
        name: 'systemUser',
        path: '/system/user',
        component: '/system/user',
        meta: { title: '用户管理', icon: false }
      },
      {
        name: 'systemRole',
        path: '/system/role',
        component: '/system/role',
        meta: { title: '角色管理', icon: false }
      },
      {
        name: 'systemLog',
        path: '/system/log',
        component: '/system/log',
        meta: { title: '系统日志', icon: false }
      }
    ]
  },
  {
    name: 'baseData',
    path: '/baseData',
    meta: { title: '基础资料', icon: 'setting' },
    children: [
      {
        name: 'baseDataCommodity',
        path: '/baseData/commodity',
        component: '/baseData/commodity',
        meta: { title: '商品管理', icon: false }
      },
      {
        name: 'baseDataClient',
        path: '/baseData/client',
        component: '/baseData/client',
        meta: { title: '客户管理', icon: false }
      },
      {
        name: 'baseDataSupplier',
        path: '/baseData/supplier',
        component: '/baseData/supplier',
        meta: { title: '供应商管理', icon: false }
      },
      {
        name: 'baseDataStock',
        path: '/baseData/stock',
        component: '/baseData/stock',
        meta: { title: '期初库存', icon: false }
      }
    ]
  },
  {
    name: 'census',
    path: '/census',
    meta: { title: '统计报表', icon: 'setting' },
    children: [
      {
        name: 'censusWarning',
        path: '/census/warning',
        component: '/census/warning',
        meta: { title: '库存预警', icon: false }
      },
      {
        name: 'censusPurchase',
        path: '/census/purchase',
        component: '/census/purchase',
        meta: { title: '商品采购', icon: false }
      },
      {
        name: 'censusSale',
        path: '/census/sale',
        component: '/census/sale',
        meta: { title: '销售统计', icon: false }
      },
      {
        name: 'censusDay',
        path: '/census/day',
        component: '/census/day',
        meta: { title: '日统计分析', icon: false }
      },
      {
        name: 'censusMonth',
        path: '/census/month',
        component: '/census/month',
        meta: { title: '月统计分析', icon: false }
      }
    ]
  },
  {
    name: 'purchase',
    path: '/purchase',
    meta: { title: '进货管理', icon: 'setting' },
    children: [
      {
        name: 'purchaseEnter',
        path: '/purchase/enter',
        component: '/purchase/enter',
        meta: { title: '进货入库', icon: false }
      },
      {
        name: 'censusReturn',
        path: '/purchase/return',
        component: '/purchase/return',
        meta: { title: '商品采购', icon: false }
      },
      {
        name: 'censusSingle',
        path: '/purchase/single',
        component: '/purchase/single',
        meta: { title: '进货单据查询', icon: false }
      },
      {
        name: 'censusRsingle',
        path: '/purchase/rsingle',
        component: '/purchase/rsingle',
        meta: { title: '退货单据查询', icon: false }
      },
      {
        name: 'censusMow',
        path: '/purchase/now',
        component: '/purchase/now',
        meta: { title: '当前库存查询', icon: false }
      }
    ]
  },
  {
    name: 'sale',
    path: '/sale',
    meta: { title: '销售管理', icon: 'setting' },
    children: [
      {
        name: 'saleRuturn',
        path: '/sale/ruturn',
        component: '/sale/ruturn',
        meta: { title: '销售出库', icon: false }
      },
      {
        name: 'censusTuiho',
        path: '/sale/tuiho',
        component: '/sale/tuiho',
        meta: { title: '客户退货', icon: false }
      },
      {
        name: 'censusSingle',
        path: '/sale/single',
        component: '/sale/single',
        meta: { title: '销售单据查询', icon: false }
      },
      {
        name: 'censusTuihoc',
        path: '/sale/tuihoc',
        component: '/sale/tuihoc',
        meta: { title: '客户退货查询', icon: false }
      }
    ]
  }
]
