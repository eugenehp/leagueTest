import should from 'should'
import Person from '../server/models/person'


describe('Person', () => {
  it('creates an object', () => {
    const normalPerson = { username: 'user', preferences: { gender: 'female' } }
    const newPerson = new Person(normalPerson)
    newPerson.should.be.an.Object()
    newPerson.save.should.be.a.Function()
  })
  it('throws on invalid input', () => {
    should.throws(
      () => {
        new Person() // eslint-disable-line
      },
      /Not enough info/
    )

    should.throws(
      () => {
        new Person({ username: 'user' }) // eslint-disable-line
      },
      /No preferences given/
    )

    should.throws(
      () => {
        new Person({ username: 'user', preferences: {} }) // eslint-disable-line
      },
      /No gender preference given/
    )
  })
})

