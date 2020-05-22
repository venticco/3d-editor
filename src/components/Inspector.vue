<template>
  <details class="inspector">
    <summary>Inspector:</summary>
    <entity-node
      v-for="entity in entities"
      :key="entity.id"
      :entity="entity"
    />
  </details>
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
<style lang="scss" scoped>
.inspector {
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0.6;
  background: #eee;
}
</style>
