export function chooseCondition(conditions) {
  if (!Array.isArray(conditions) || conditions.length === 0) {
    throw new Error('conditions must be a non-empty array')
  }

  const index = Math.floor(Math.random() * conditions.length)
  return conditions[index]
}
