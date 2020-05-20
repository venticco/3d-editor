import Vue from 'vue'
import Vuex from 'vuex'
import { nextFreeEntityId } from '../utils/entities'

Vue.use(Vuex)

const mutations = {
  addEntity (state, payload) {
    state.entities.push(payload.entity)
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
    console.log('adding event', payload)
    state.events.push(payload.event)
    console.log('event pushed', state.events.length)
  },
  clearFuture (state, payload) {
    state.events = state.events.filter(evt => evt.timestamp < payload.timestamp)
  }
}

const store = new Vuex.Store({
  state: {
    entities: [],
    events: []
  },
  getters: {
    entities: (state) => state.entities,
    events: state => state.events
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
    }
  },
  modules: {
  }
})

store.subscribe((mutation, state) => {
  console.log('mutation is happening', mutation.type, mutation.payload)
  if (mutation.payload.record) {
    store.commit('addEvent', {
      event: {
        timestamp: state.events.length,
        type: mutation.type,
        payload: JSON.stringify(mutation.payload)
      }
    })
  }
})

export default store
