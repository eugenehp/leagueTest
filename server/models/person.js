import assert from 'assert'
import cloneDeep from 'lodash/cloneDeep'
import client from '../services/redis'
import omit from 'lodash/omit'

export default class Person {
  static get(username) {
    return Promise.all([
      client.hgetallAsync(`users:${username}`),
      client.hgetallAsync(`preferences:${username}`),
      client.smembersAsync(`likes:${username}`),
      client.smembersAsync(`rejects:${username}`),
    ])
      .then(([user, preferences, likes, rejects]) => {
        if (!user) {
          throw new Error('User not found')
        }
        return {
          user: Object.assign({}, user, { age: parseInt(user.age, 10) }),
          preferences: Object.assign({}, preferences, {
            ageRangeMax: parseInt(preferences.ageRangeMax, 10),
            ageRangeMin: parseInt(preferences.ageRangeMin, 10),
          }),
          likes,
          rejects,
        }
      })
  }

  constructor(person) {
    assert(person, 'Not enough info')

    const newPerson = cloneDeep(person)
    const { preferences, username, gender, age, religion } = person
    assert(username, 'No username given')
    assert(gender, 'No gender given')
    assert(age, 'No age given')
    assert(religion, 'No religion given')
    assert(preferences, 'No preferences given')
    assert(preferences.gender, 'No gender preference given')

    const defaultPreferences = {
      ageRangeMax: 60,
      ageRangeMin: 18,
      distance: 50,
      religion: 'christian',
    }
    newPerson.preferences = Object.assign({}, defaultPreferences, preferences)

    Object.assign(this, newPerson)
  }

  save() {
    const user = this
    const { username, preferences, gender, religion, age } = user
    return Promise.all([
      client.saddAsync('users', username),
      client.saddAsync(`index:gender:${gender}`, username),
      client.saddAsync(`index:religion:${religion}`, username),
      client.saddAsync(`index:age:${age}`, username),
      client.hmsetAsync(`users:${username}`, omit(user, 'preferences')),
      client.hmsetAsync(`preferences:${username}`, preferences),
    ])
      .then(() => 'OK')
  }
}
