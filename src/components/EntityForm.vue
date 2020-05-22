<template>
  <div>
    <h2>{{ selectedEntity ? 'Update' : 'New'}} entity</h2>
    <div>
      <label>Type:</label>
      <select v-model="entity.type">
        <option v-for="type in types" :key="type">{{type}}</option>
      </select>
    </div>
    <div>
      <label>Color:</label>
      <select v-model="entity.color">
        <option v-for="color in colors" :key="color">{{color}}</option>
      </select>
    </div>
    <div>
      <label>X:</label>
      <input v-model.number="entity.position.x" />
      <label>Y:</label>
      <input v-model.number="entity.position.y" />
    </div>
    <div>
      <label>Rotation:</label>
      <input v-model.number="entity.rotation" />
    </div>
    <div>
      <label>Size:</label>
      <input v-model.number="entity.size" />
    </div>
    <button @click="updateEntity" v-if="entity.id">Save entity</button>
    <button @click="createEntity" v-else>Add entity</button>
    <button @click="removeEntity" v-if="entity.id">Remove</button>
  </div>
</template>
<script>
const types = ['sphere', 'cube', 'pyramid']
const colors = ['red', 'blue', 'green']
export default {
  data () {
    return {
      defaultEntity: {
        type: 'sphere',
        position: {
          x: 0,
          y: 0
        },
        rotation: 0,
        color: 'red',
        size: 10
      },
      entity: {
        type: 'sphere',
        position: {
          x: 0,
          y: 0
        },
        rotation: 0,
        color: 'red',
        size: 10
      },
      types,
      colors
    }
  },
  computed: {
    selectedEntity () {
      const selected = this.$store.getters.entities.filter(e => e.selected)
      return selected.length === 1 ? selected[0] : null
    }
  },
  methods: {
    createEntity () {
      this.$store.dispatch('createEntity', {
        entity: this.entity
      })
      this.prepareEntity()
    },
    updateEntity () {
      this.$store.dispatch('updateEntity', {
        entity: this.entity,
        record: true
      })
    },
    prepareEntity () {
      const source = this.selectedEntity || this.defaultEntity
      this.entity = JSON.parse(JSON.stringify(source))
    },
    removeEntity () {
      this.$store.dispatch('removeEntity', {
        id: this.entity.id,
        record: true
      })
    }
  },
  watch: {
    selectedEntity (val) {
      this.prepareEntity()
    }
  }
}
</script>
