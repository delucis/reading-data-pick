'use strict'

const DESCRIBE = require('mocha').describe
const BEFORE_EACH = require('mocha').beforeEach
const IT = require('mocha').it
const EXPECT = require('chai').expect
const READING_DATA = require('@delucis/reading-data')
const RDPick = require('../index')

BEFORE_EACH(function () {
  READING_DATA.uninstall()
  READING_DATA.clean()
})

DESCRIBE('ReadingDataPick', function () {
  IT('should be an object', function () {
    EXPECT(RDPick).to.be.an('object')
  })

  IT('should have a config object', function () {
    EXPECT(RDPick).to.have.property('config')
    EXPECT(RDPick.config).to.be.an('object')
  })

  IT('should have a data method', function () {
    EXPECT(RDPick).to.have.property('data')
    EXPECT(RDPick.data).to.be.a('function')
  })

  IT('should throw an error if there is no pick property in config', async function () {
    READING_DATA.use(RDPick)
    try {
      await READING_DATA.run()
    } catch (e) {
      EXPECT(e).to.be.an('error')
    }
  })

  IT('should pick a passed path that is a string', async function () {
    let testScope = 'fascinatingObject'
    let testString = 'This is a short article that needs analysing.'
    let testObject = {
      string: testString,
      number: 75,
      boolean: true
    }
    let testPath = 'string'

    READING_DATA.preloadData({
      [testScope]: testObject
    })

    READING_DATA.use(RDPick, {
      scope: testScope,
      pick: testPath
    })

    await READING_DATA.run()

    let output = READING_DATA.data[testScope]

    EXPECT(output).to.have.property(testPath)
    EXPECT(output[testPath]).to.equal(testString)
    EXPECT(output).to.not.have.property('number')
    EXPECT(output).to.not.have.property('boolean')
  })

  IT('should pick a passed path that is an array', async function () {
    let testScope = 'fascinatingObject'
    let testString = 'This is a short article that needs analysing.'
    let testObject = {
      string: testString,
      number: 75,
      boolean: true
    }
    let testPath = ['string', 'boolean']

    READING_DATA.preloadData({
      [testScope]: testObject
    })

    READING_DATA.use(RDPick, {
      scope: testScope,
      pick: testPath
    })

    await READING_DATA.run()

    let output = READING_DATA.data[testScope]

    for (let path of testPath) {
      EXPECT(output).to.have.property(path)
    }
    EXPECT(output).to.not.have.property('number')
  })
})
