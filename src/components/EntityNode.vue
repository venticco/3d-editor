<template>
  <details>
    <summary>{{entity.id}}:{{entity.type}}</summary>
    <component-node
      v-for="component in components"
      :key="component.type"
      :id="entity.id"
      :type="component.type"
      :value="component.value"
    />
  </details>
</template>
<script>
import ComponentNode from './ComponentNode.vue'

export default {
  props: {
    entity: {
      required: true
    }
  },
  components: {
    ComponentNode
  },
  computed: {
    components () {
      const compTypes = Object.keys(this.entity).filter(k => k !== 'id')
      return compTypes.map(type => ({ type, value: this.entity[type] }))
    }
  }
}
</script>
