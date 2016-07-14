import client from '../../services/redis'
import koaRouter from 'koa-router'
import Person from '../../models/person'
import times from 'lodash/times'
import compact from 'lodash/compact'

const checkUsernameInAgeGroup = usernameLocal => age => client
  .sismemberAsync(`index:age:${age}`, usernameLocal)
  .then(result => (result ? usernameLocal : null))

const checkAgeMatchByUsername = suitableAges => usernameLocal => Promise
  .all(suitableAges.map(checkUsernameInAgeGroup(usernameLocal)))
  .then(result => compact(result)[0])


const router = koaRouter()
router.get('/:username', function* handler() {
  const { username } = this.params
  const { user, preferences, likes, rejects } = yield Person.get(username)
  const ageRangeWidth = preferences.ageRangeMax - preferences.ageRangeMin + 1
  const suitableAges = times(ageRangeWidth, i => i + preferences.ageRangeMin)

  // If we liked already we probably do not want to like again
  const blackList = [...likes, ...rejects]

  const matchingSexAndReligion = yield client.sinterAsync(
    `index:religion:${preferences.religion}`,
    `index:gender:${preferences.gender}`,
  )

  const filteredBlacklist = matchingSexAndReligion
    .filter(i => !blackList.includes(i))


  const matchingAge = compact(
    yield Promise.all(filteredBlacklist
      .map(checkAgeMatchByUsername(suitableAges)))
  )

  const matchContentes = yield Promise.all(matchingAge.map(Person.get))

  const match = matchContentes
    .filter(
      ({ likes: likesLocal, rejects: rejectsLocal }) =>
        ![...likesLocal, rejectsLocal].includes(username)
    )
    .slice(0, 5)

  this.body = Object.assign({}, {
    preferences,
    user,
    likes,
    rejects,
    match,
  })
})

export default router.routes()
