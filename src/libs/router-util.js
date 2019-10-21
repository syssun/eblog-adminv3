import {
	hasChild,
	localRead,
	getToken
} from '@/libs/util'
import store from '@/store'
import Main from '@/components/main'
import parentView from '@/components/parent-view'

import {
	forEach
} from '@/libs/tools'

// 加载菜单
export const loadMenu = () => {
	let list = []
	let data = localRead('route')
	if (!data) {
		return list
	}
	list = formatMenu(JSON.parse(data))
	return list
}

// 格式化菜单
export const formatMenu = (list) => {
	let res = []
	forEach(list, item => {
		let obj = {
			path: item.path,
			name: item.name
		}
    let mcomponent = item.component;
		obj.meta = item.meta
    if(mcomponent=='Main' || mcomponent=='/Main'){
      obj.component = Main
    } else if(mcomponent=='parentView' || mcomponent=='/parentView'){
      obj.component = parentView
    }else {
			let data = item.component
			// 这里的data应为 /notice/notice.vue 类似的数据，对应的是src/view/下的本地文件
			obj.component = () => import('@/view' + data)
		}
		if (hasChild(item)) {
			obj.children = formatMenu(item.children)
		}
		res.push(obj)
	})
	return res
}
