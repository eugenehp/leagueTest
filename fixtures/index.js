import client, { redisPromise } from '../server/services/redis'
import { info, error } from '../server/services/bunyan'
import faker from 'faker'
import times from 'lodash/times'
import Person from '../server/models/person'


const maxAge = 60
const minAge = 18

async function main() {
  try {
    await redisPromise
    await client.flushdbAsync()

    const createPreference = () => {
      const ageRangeMin = faker.random.number({ min: minAge, max: maxAge })
      return {
        ageRangeMin,
        ageRangeMax: faker.random.number({ min: ageRangeMin, max: maxAge }),
        distance: faker.random.arrayElement([5, 10, 50, 100, 150, 200]),
        religion: faker.random.arrayElement(['christian', 'muslim', 'buddist', 'atheist']),
        gender: faker.random.arrayElement(['male', 'female']),
      }
    }
    const createUser = () => ({
      name: faker.name.findName(),
      username: faker.internet.userName().toLowerCase(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      gender: faker.random.arrayElement(['male', 'female']),
      age: faker.random.number({ min: minAge, max: maxAge }),
      religion: faker.random.arrayElement(['christian', 'muslim', 'buddist', 'atheist']),
      preferences: createPreference(),
    })

    await new Person(Object.assign(createUser(), { username: 'test' })).save()

    const result = await Promise.all(times(10000, () => new Person(createUser()).save()))
    info(result)
    info('Users added')
  } catch (e) {
    error(e)
  } finally {
    process.exit()
  }
}

main()
