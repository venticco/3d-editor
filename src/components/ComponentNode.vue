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
    }
  }
}
</script>
