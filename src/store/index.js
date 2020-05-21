import Vue from 'vue'
import Vuex from 'vuex'
import { nextFreeEntityId, cloneEntities } from '../utils/entities'

Vue.use(Vuex)

const mutations = {
  replaceEntities (state, payload) {
    state.entities = payload.entities
  },
  addEntity (state, payload) {
    state.entities.push(payload.entity)
  },
  updateEntity (state, payload) {
    const entityIdx = state.entities.findIndex(ent => ent.id === payload.entity.id)
    if (entityIdx > -1) state.entities.splice(entityIdx, 1, cloneEntities(payload.entity))
  },
  removeEntity (state, payload) {
    const entityIdx = state.entities.findIndex(ent => ent.id === payload.id)
    if (entityIdx > -1) state.entities.splice(entityIdx, 1)
  },
  updateComponent (state, payload) {
    const entityIdx = state.entities.findIndex(ent => ent.id === payload.id)
    if (entityIdx > -1) {
      const entity = state.entities[entityIdx]
      Vue.set(entity, payload.componentKey, payload.componentValue)
    }
  },
  addEvent (state, payload) {
    state.events.push(payload.event)
  },
  clearFuture (state, payload) {
    state.events = state.events.filter(evt => evt.timestamp < payload.timestamp)
  },
  setTimestep (state, payload) {
    state.currentTimestep = payload.timeStep
  },
  setSelection (state, payload) {
    const selectedIds = payload.ids
    state.entities.forEach(entity => {
      Vue.set(entity, 'selected', selectedIds.includes(entity.id))
    })
  }
}

const store = new Vuex.Store({
  state: {
    entities: [],
    events: [],
    currentTimestep: -1,
    selectedId: null
  },
  getters: {
    entities: (state) => state.entities,
    events: state => state.events,
    currentTimestep: state => state.currentTimestep,
    selectedId: state => state.selectedId
  },
  mutations,
  actions: {
    createEntity ({ getters, commit }, payload) {
      commit('addEntity', {
        record: true,
        entity: {
          id: nextFreeEntityId(getters.entities),
          ...payload.entity
        }
      })
    },
    updateEntity ({ commit }, payload) {
      commit('updateEntity', payload)
    },
    removeEntity ({ commit }, payload) {
      commit('removeEntity', {
        record: true,
        ...payload
      })
    },
    updateComponent ({ commit }, payload) {
      commit('updateComponent', {
        record: true,
        ...payload
      })
    },
    selectEntity ({ commit }, payload) {
      commit('setSelection', {
        ...payload,
        record: true
      })
    },
    timeTravelTo ({ commit, getters }, payload) {
      const targetTime = payload.timeStep
      const allTranformations = getters.events
      const currentTimestep = getters.currentTimestep
      if (targetTime !== currentTimestep) {
        const transformationsFilter = targetTime > currentTimestep
          ? (t) => t.timestamp > currentTimestep && t.timestamp <= targetTime
          : (t) => t.timestamp <= targetTime
        const relevantTransformations = allTranformations.filter(transformationsFilter)
        const initState = targetTime > currentTimestep ? {
          entities: cloneEntities(getters.entities)
        } : { entities: [] }
        const newState = relevantTransformations.reduce((acc, curr) => {
          const { type, payload } = curr
          mutations[type](acc, JSON.parse(payload))
          return acc
        }, initState)
        commit('replaceEntities', {
          entities: newState.entities
        })
        commit('setTimestep', { timeStep: targetTime })
      }
    }
  },
  modules: {
  }
})

store.subscribe((mutation, state) => {
  if (mutation.payload.record) {
    const timestamp = state.currentTimestep + 1
    store.commit('clearFuture', { timestamp })
    store.commit('addEvent', {
      event: {
        timestamp,
        type: mutation.type,
        payload: JSON.stringify(mutation.payload)
      }
    })
    store.commit('setTimestep', { timeStep: timestamp })
  }
})

export default store
