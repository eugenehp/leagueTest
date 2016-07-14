import should from 'should'
import Person from '../server/models/person'


describe('Person', () => {
  it('creates an object', () => {
    const normalPerson = { preferences: { gender: 'female' } }
    Person(normalPerson).should.be.an.Object()
  })
  it('throws on invalid input', () => {
    should.throws(
      () => {
        Person()
      },
      /Not enough info/
    )

    should.throws(
      () => {
        Person({})
      },
      /Not preference given/
    )

    should.throws(
      () => {
        Person({ preferences: {} })
      },
      /No gender preference given/
    )
  })
})

