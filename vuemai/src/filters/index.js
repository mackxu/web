import moment from 'moment'

moment.locale('zh-cn', {
	weekdays: ['日', '一', '二', '三', '四', '五', '六']
})

export const timestampFormat = (timestamp, type) => {
	return moment(timestamp).format(type)
}