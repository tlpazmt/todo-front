<template>
  <v-card class="task-card rounded-lg">
    <v-card-title>{{ task.title }}</v-card-title>
    <v-card-text>
      {{ task.description }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.task-card {
  margin-bottom: 10px;
}
</style>
