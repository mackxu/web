import moment from 'moment'

export const timestampFormat = (timestamp, type) => {
	return moment(timestamp).format(type)
}