<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-50 -50 100 100"
    preserveAspectRatio="xMidYMid meet"
    width="200"
    height="200"
    @click="unselect"
  >
    <v-switch v-for="entity in entities" :key="entity.id" :value="entity.type">
      <template #sphere>
        <circle
          @click.stop="select(entity)"
          :cx="entity.position.x"
          :cy="entity.position.y"
          :r="entity.size / 2"
          :stroke="entity.selected ? 'pink' : 'black'"
          stroke-width="1"
          :fill="entity.color" />
      </template>
      <template #cube>
        <rect
          @click.stop="select(entity)"
          :x="entity.position.x - entity.size/2"
          :y="entity.position.y - entity.size/2"
          :width="entity.size"
          :height="entity.size"
          :stroke="entity.selected ? 'pink' : 'black'"
          stroke-width="1"
          :fill="entity.color"
          :transform="`rotate(${entity.rotation})`"
        />
      </template>
      <template #pyramid>
        <polygon
          @click.stop="select(entity)"
          :points="points(entity)"
          :stroke="entity.selected ? 'pink' : 'black'"
          stroke-width="1"
          :fill="entity.color"
          :transform="`rotate(${entity.rotation})`"
        />
      </template>
    </v-switch>
  </svg>
</template>
<script>
export default {
  name: 'Workspace2D',
  computed: {
    entities () {
      return this.$store.getters.entities
    }
  },
  methods: {
    points (entity) {
      const s = entity.size
      const x = entity.position.x
      const y = entity.position.y
      const topX = x
      const topY = y - (s * Math.sqrt(3) / 3)
      const botY = y + (s * Math.sqrt(3) / 6)
      const leftX = x - (s / 2)
      const rightX = x + (s / 2)
      return `${topX}, ${topY} ${rightX},${botY} ${leftX},${botY}`
    },
    select (entity) {
      this.$store.dispatch('selectEntity', { ids: [entity.id] })
    },
    unselect () {
      this.$store.dispatch('selectEntity', { ids: [] })
    }
  }
}
</script>
<style scoped>
svg {
  width: 200px;
  height: 200px;
  border: 1px solid black;
}
</style>
