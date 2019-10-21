export const routerMenu = [
  
  {
    path: '/goods',
    name: 'goods',
    component: 'Main',
    meta: {
      icon: 'md-flower',
      title: '商品管理',
      showAlways: true
    },
    children: [
      {
        path: 'goodslist',
        name: 'goodslist',
        meta: {
          icon: 'md-flower',
          title: '商品列表'
        },
        component: '/myview/goods/goods'
      }
    ]
  }
]
