'use strict'

class MapExtension {
	static fromObject(obj) {
		let keys = Object.keys(obj)
		let result = new Map()

		for (let i = 0; i < keys.length; i++) {
			result.set(keys[i], obj[keys[i]])
		}

		return result
	}
}

module.exports = MapExtension