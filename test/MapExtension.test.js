'use strict'

const expect = require('chai').expect
const MapExtension = require('../MapExtension')

describe('MapExtension', () => {
	it('fromObject', (done) => {
		let obj = { A: 1, B: 2, C:3 }
		let map = MapExtension.fromObject(obj)

		expect(map.size).to.eql(3)

		expect(map.get('A')).to.eql(1)
		expect(map.get('B')).to.eql(2)
		expect(map.get('C')).to.eql(3)

		done()
	})
})