<template>
  <div id="app" class="app">
    <div class="row">
      <workspace2-d />
      <workspace3-d />
    </div>
    <div class="row">
      <entity-form />
      <timeline />
    </div>
  </div>
</template>

<script>
import Timeline from './components/Timeline.vue'
import Workspace2D from './components/Workspace2D.vue'
import Workspace3D from './components/Workspace3D.vue'
import EntityForm from './components/EntityForm.vue'
// import Inspector from './components/Inspector.vue'

export default {
  name: 'App',
  components: {
    Timeline,
    EntityForm,
    // Inspector,
    Workspace2D,
    Workspace3D
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
  flex-direction: column;
}
.row {
  display: flex;
  flex-direction: row;
}
.app > *, .row > * {
  flex-grow: 1;
}
</style>
