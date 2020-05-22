<template>
  <details>
    <summary>{{entity.id}}:{{entity.type}}</summary>
    <component-node
      v-for="component in components"
      :key="component.type"
      :id="entity.id"
      :type="component.type"
      :value="component.value"
      :entityType="entity.type"
    />
  </details>
</template>
<script>
import ComponentNode from './ComponentNode.vue'
import { Mesh } from '@babylonjs/core/Meshes/mesh'

export default {
  props: {
    entity: {
      required: true
    }
  },
  components: {
    ComponentNode
  },
  inject: ['scene'],
  computed: {
    components () {
      const compTypes = Object.keys(this.entity).filter(k => k !== 'id')
      return compTypes.map(type => ({ type, value: this.entity[type] }))
    }
  },
  created () {
    switch (this.entity.type) {
      case 'sphere':
        Mesh.CreateSphere(this.entity.id, 16, 1, this.scene)
        break
      case 'cube':
        Mesh.CreateBox(this.entity.id, 1, this.scene)
        break
      case 'pyramid':
        Mesh.CreatePolyhedron(this.entity.id, { type: 0, size: 0.5 }, this.scene)
        break
    }
  },
  destroyed () {
    const mesh = this.scene.getMeshByName(this.entity.id)
    mesh.dispose()
  }
}
</script>
