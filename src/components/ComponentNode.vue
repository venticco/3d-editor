<template>
  <div>
  <v-switch :value="type">
    <template #color>
      <span><i class="tile" :style="{backgroundColor: value}"></i>{{value}}</span>
    </template>
    <template #type>
      <span>{{value}}</span>
    </template>
    <template #position>
      <span>x: {{value.x}}, y: {{value.y}}</span>
    </template>
    <template #rotation>
      <span>angle: {{value}}</span>
    </template>
    <template #size>
      <span>size: {{value}}</span>
    </template>
    <template #selected>
      <span>selected: {{value}}</span>
    </template>
  </v-switch>
  </div>
</template>
<script>
import { StandardMaterial } from '@babylonjs/core/Materials'
import { Color3, Vector3 } from '@babylonjs/core/Maths/math'

const colors = {
  red: new Color3(1, 0, 0),
  green: new Color3(0, 1, 0),
  blue: new Color3(0, 0, 1)
}

export default {
  props: {
    type: {
      required: true
    },
    value: {
      required: true
    },
    id: {
      required: true
    },
    entityType: {
      required: true
    }
  },
  inject: ['scene'],
  created () {
    this.setValue()
  },
  computed: {
    mesh () {
      return this.scene.getMeshByName(this.id)
    }
  },
  watch: {
    value () {
      this.setValue()
    }
  },
  methods: {
    setValue () {
      switch (this.type) {
        case 'color':
          this.setColor()
          break
        case 'position':
          this.setPosition()
          break
        case 'size':
          this.setSize()
          break
        case 'rotation':
          this.setRotation()
          break
      }
    },
    setColor () {
      let material = this.scene.getMaterialByName(this.value)
      if (!material) {
        material = new StandardMaterial(this.value, this.scene)
        material.diffuseColor = colors[this.value]
      }
      this.mesh.material = material
    },
    setPosition () {
      this.mesh.position.x = this.value.x
      this.mesh.position.z = -this.value.y
    },
    setSize () {
      this.mesh.scaling = new Vector3(this.value, this.value, this.value)
    },
    setRotation () {
      this.mesh.rotation.y = (this.value / 180) * Math.PI // - Math.PI
    }
  }
}
</script>
