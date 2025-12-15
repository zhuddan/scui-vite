import store from '@/store'
import { useViewTagsStore } from '@/store/viewTags'
import { nextTick } from 'vue'

export function beforeEach(to, from){
	var adminMain = document.querySelector('#adminui-main')
	const viewTagsStore = useViewTagsStore()
	if(!adminMain){return false}
	viewTagsStore.updateViewTags({
		fullPath: from.fullPath,
		scrollTop: adminMain.scrollTop
	})
}

export function afterEach(to){
	const viewTagsStore = useViewTagsStore()
	var adminMain = document.querySelector('#adminui-main')
	if(!adminMain){return false}
	nextTick(()=>{
		var beforeRoute = viewTagsStore.viewTags.filter(v => v.fullPath == to.fullPath)[0]
		if(beforeRoute){
			adminMain.scrollTop = beforeRoute.scrollTop || 0
		}
	})
}
