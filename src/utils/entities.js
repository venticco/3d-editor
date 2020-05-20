export function nextFreeEntityId (entities) {
  let maxId = 0
  entities.forEach((entity) => {
    maxId = Math.max(maxId, entity.id)
  })
  return maxId + 1
}

export function cloneEntities (entities) {
  return JSON.parse(JSON.stringify(entities))
}
