<template>
  <div>
    <button @click="undo" :disabled="currentTimestep === -1">Undo</button>
    <button @click="redo" :disabled="currentTimestep === events.length - 1">Redo</button>
    <ol>
      <li
        v-for="event in events"
        :key="event.timestamp"
        :class="{current: event.timestamp === currentTimestep}"
        @click="travelTo(event.timestamp)">
        {{event.timestamp}}:{{event.type}}
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  computed: {
    events () {
      return this.$store.getters.events
    },
    currentTimestep () {
      return this.$store.getters.currentTimestep
    }
  },
  methods: {
    travelTo (target) {
      this.$store.dispatch('timeTravelTo', { timeStep: target })
    },
    undo () {
      this.travelTo(this.currentTimestep - 1)
    },
    redo () {
      this.travelTo(this.currentTimestep + 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.current {
  background: blue;
  color: white;
}
</style>
