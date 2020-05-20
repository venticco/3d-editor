<template>
  <div>
    <button @click="createEntity">Add entity</button>
  </div>
</template>
<script>
export default {
  methods: {
    createEntity () {
      this.$store.dispatch('createEntity', {
        entity: {
          name: 'ABC',
          number: Math.round(Math.random() * 10)
        }
      })
    }
  }
}
</script>
