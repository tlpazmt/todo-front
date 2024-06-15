<template>
  <v-card class="status-block" color="grey-lighten-3 rounded-lg">
    <v-card-title>{{ title }}</v-card-title>
    <div class="scrollable-body">
      <v-card-text>
        <slot></slot>
      </v-card-text>
    </div>
    <v-card-actions>
<!--      TODO plus icon-->
      <v-btn block class="text-caption"><v-icon icon="mdi-check-circle" start></v-icon>Добавить задачу</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'To do'
    }
  }
}
</script>

<style scoped>
.status-block {
  width: 272px;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
}

.scrollable-body {
  overflow-y: auto;
  flex-grow: 1;
}
</style>
