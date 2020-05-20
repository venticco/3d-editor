<template>
  <ol>
    <li v-for="event in events" :key="event.timestamp">{{event.timestamp}}:{{event.type}}</li>
  </ol>
</template>
<script>
export default {
  computed: {
    events () {
      return this.$store.getters.events
    }
  }
}
</script>
