import should from 'should'
import Person from '../server/models/person'


describe('Person', () => {
  it('creates an object', () => {
    const normalPerson = {
      username: 'user',
      gender: 'male',
      age: '40',
      religion: 'muslim',
      preferences: { gender: 'female' },
    }
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
        new Person({ // eslint-disable-line
          username: 'user',
          gender: 'male',
          age: '40',
          religion: 'muslim',
          preferences: {},
        })
      },
      /No gender preference given/
    )
  })
})

