/**
 * Created by pazitflekman on 27/06/2017.
 */
'use strict'

const _ = require('lodash')
const inspect = require('util').inspect
const MapExtension = require('./MapExtension')

class Targeting {
	constructor(expression) {
		this.expression = MapExtension.fromObject(expression)

		for (let [key, value] of defaultTargeting) {
			if (!this.expression.has(key)) {
				this.expression.set(key, defaultTargeting.get(key))
			}
		}

		this.name = inspect(this.expression)
	}

	match(visitor) {

		for (let [key, matcher] of this.expression) {

			let targetingValue = visitor[key]
			if (!targetingValue) continue
			if (!matcher(targetingValue)) {
				return false
			}
		}

		return true
	}

	static all() {
		return function all(candidate) {
			return true
		}
	}

	static specific(val) {
		return function specific(candidate) {
			return candidate === val
		}
	}

	static included(val) {
		return function included(candidate) {
			return val.indexOf(candidate) > -1
		}
	}

	toString() {
		return this.name
	}

	static defaultTargeting() {
		return new Targeting({})
	}
}

const defaultTargeting = new Map()
defaultTargeting.set('geo', Targeting.all())
defaultTargeting.set('page', Targeting.all())

module.exports = Targeting