<template>
  <div id="app" class="app">
    <timeline />
    <workspace />
    <inspector />
    <entity-form />
  </div>
</template>

<script>
import Timeline from './components/Timeline.vue'
import Workspace from './components/Workspace.vue'
import EntityForm from './components/EntityForm.vue'
import Inspector from './components/Inspector.vue'

export default {
  name: 'App',
  components: {
    Timeline,
    Workspace,
    EntityForm,
    Inspector
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.app {
  display: flex;
  flex-direction: row;
}
.app > * {
  flex-grow: 1;
}
</style>
