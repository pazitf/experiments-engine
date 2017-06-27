'use strict'

const expect = require('chai').expect
const Targeting = require('../Targeting')

describe('Targeting',  () => {
	describe('constructor', (done) => {

		it('empty', (done) => {
			let targeting = new Targeting({})

			expect(targeting.expression.get('geo').prototype).to.eql(Targeting.all().prototype)
			expect(targeting.expression.get('page').prototype).to.eql(Targeting.all().prototype)

			done()
		})

		it('missing expression parameter - check that callback is Targeting.all()', (done) => {
			let targeting = new Targeting({'page':'buy'})

			expect(targeting.expression.get('geo').prototype).to.eql(Targeting.all().prototype)
			expect(targeting.expression.get('page')).to.eql('buy')

			done()
		})

	})

	describe('match', (done) => {
		let targeting = new Targeting({ geo: Targeting.specific('US') })
		let usVisitor = { geo: 'US' }
		let ilVisitor = { geo: 'IL' }

		it('visitor is targeted', (done) => {
			expect(targeting.match(usVisitor)).to.be.true
			done()
		})

		it('visitor is not targeted', (done) => {
			expect(targeting.match(ilVisitor)).to.be.false
			done()
		})

	})

	describe('all', (done) => {
		let targeting = new Targeting({geo: Targeting.all()})

		it('match', (done) => {
			expect(targeting.match({geo: 'US'})).to.be.true
			expect(targeting.match({geo: 'IL'})).to.be.true

			done()
		})
	})

	describe('specific',(done) => {
		let matcher = Targeting.specific(3)

		it('return true', (done) => {
			expect(matcher(3)).to.be.true
			done()
		})

		it('return false', (done) => {
			expect(matcher(2)).to.be.false
			done()
		})

	})

	describe('included', (done) => {
		let matcher = Targeting.included([1,2,3])

		it('return true', (done) => {
			expect(matcher(1)).to.be.true
			done()
		})

		it('return false', (done) => {
			expect(matcher(4)).to.be.false
			done()
		})

	})
})