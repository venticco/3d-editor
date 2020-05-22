<template>
  <div class="wrapper">
    <canvas id="canvas"></canvas>
    <inspector />
  </div>
</template>
<script>
import Inspector from './Inspector.vue'
import { Engine } from '@babylonjs/core/Engines/engine'
import { Scene } from '@babylonjs/core/scene'
import { Vector3 } from '@babylonjs/core/Maths/math'
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera'
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight'
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { StandardMaterial } from '@babylonjs/core/Materials'

import '@babylonjs/core/Meshes/meshBuilder'
import '@babylonjs/core/Materials/standardMaterial'

export default {
  data () {
    return {
      reactive: {
        engine: null,
        scene: null
      }
    }
  },
  components: {
    Inspector
  },
  provide () {
    return this.reactive
  },
  mounted () {
    const canvas = document.getElementById('canvas')
    const engine = new Engine(canvas)
    this.reactive.engine = engine
    const scene = new Scene(engine)
    this.reactive.scene = scene

    const camera = new FreeCamera('camera1', new Vector3(0, 60, -50), scene)
    camera.setTarget(Vector3.Zero())
    camera.attachControl(canvas, true)

    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene)
    light.intensity = 0.7
    const material = new StandardMaterial('myMaterial', scene)
    material.alpha = 0.3

    const ground = Mesh.CreateGround('ground1', 50, 50, 2, scene)
    ground.material = material

    engine.runRenderLoop(() => {
      scene.render()
    })
  }
}
</script>
<style lang="scss" scoped>
canvas {
  width: 500px;
  height: 300px;
}
.wrapper {
  position: relative;
}
</style>
