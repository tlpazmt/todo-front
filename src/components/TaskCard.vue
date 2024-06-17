<template>
  <v-card class="task-card rounded-lg">
    <v-card-title class="text-subtitle-2">{{ task.title }}</v-card-title>
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
