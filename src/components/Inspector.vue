<template>
  <div>
    <entity-node
      v-for="entity in entities"
      :key="entity.id"
      :entity="entity"
    />
  </div>
</template>
<script>
import EntityNode from './EntityNode.vue'

export default {
  components: {
    EntityNode
  },
  computed: {
    entities () {
      return this.$store.getters.entities
    }
  }
}
</script>
