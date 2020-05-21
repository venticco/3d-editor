<template>
  <div>
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
      <input v-model="entity.position.x" />
      <label>Y:</label>
      <input v-model="entity.position.y" />
    </div>
    <div>
      <label>Rotation:</label>
      <input v-model="entity.rotation" />
    </div>
    <div>
      <label>Size:</label>
      <input v-model="entity.size" />
    </div>
    <button @click="createEntity">Add entity</button>
  </div>
</template>
<script>
const types = ['pyramid', 'cube', 'sphere']
const colors = ['red', 'blue', 'green']
export default {
  data () {
    return {
      defaultEntity: {
        type: 'cube',
        position: {
          x: 0,
          y: 0
        },
        rotation: 0,
        color: 'blue',
        size: 5
      },
      entity: {
        type: 'cube',
        position: {
          x: 0,
          y: 0
        },
        rotation: 0,
        color: 'blue',
        size: 5
      },
      types,
      colors
    }
  },
  computed: {},
  methods: {
    createEntity () {
      this.$store.dispatch('createEntity', {
        entity: this.entity
      })
      this.prepareEntity()
    },
    prepareEntity () {
      this.entity = JSON.parse(JSON.stringify(this.defaultEntity))
    }
  }
}
</script>
