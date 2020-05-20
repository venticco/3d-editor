<template>
  <div class="hello">
    <pre>
      {{ entitiesJSON }}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'Workspace',
  computed: {
    entities () {
      return this.$store.getters.entities
    },
    entitiesJSON () {
      return JSON.stringify(this.entities, null, ' ')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
