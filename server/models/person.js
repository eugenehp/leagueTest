import assert from 'assert'
import cloneDeep from 'lodash/cloneDeep'

export default person => {
  assert(person, 'Not enough info')

  const newPerson = cloneDeep(person)
  const preferences = person.preferences
  assert(preferences, 'Not preference given')
  assert(preferences.gender, 'No gender preference given')

  const defaultPreferences = {
    ageRange: { min: 18, max: 50 },
    distance: 50,
    religion: 'christian',
  }
  newPerson.preferences = Object.assign({}, defaultPreferences, preferences)

  return newPerson
}
