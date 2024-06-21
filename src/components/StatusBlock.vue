<template>
  <v-card class="status-block" color="grey-lighten-3 rounded-lg">
    <v-card-title>{{ status.title }}</v-card-title>
    <div class="scrollable-body">
      <v-card-text>
        <draggable
          class="dragArea list-group w-full"
          :list="array"
          group="status"
          @change="change"
          :sort="false"
        >
          <TaskCard v-for="task in array" :key="task.id" :task="task" @click.native="$emit('add-task', task)" />
        </draggable>
      </v-card-text>
    </div>
    <v-card-actions>
      <v-btn block class="text-caption" @click="$emit('add-task', null,  status.id)">
        <v-icon icon="mdi-check-circle" start></v-icon>Добавить задачу
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next';
import TaskCard from '@/components/TaskCard.vue';
import { editTask } from '@/api.js'

export default {
  components: { draggable: VueDraggableNext, TaskCard },
  props: {
    status: Object,
    tasks: Array,
  },
  data() {
    return {
      array: []
    };
  },
  created() {
    this.array = this.tasks;
  },
  methods: {
    async change(event) {
      if (!event.hasOwnProperty('added')) {
        return;
      }

      await editTask({id: event.added.element.id, status_id: this.status.id});
      this.$emit('refreshTasks');
    },
  },
  watch: {
    tasks(val) {
      this.array = val;
    }
  }
}
</script>

<style scoped>
.status-block {
  width: 272px;
  max-height: calc(100vh);
  display: flex;
  flex-direction: column
}

.scrollable-body {
  overflow-y: auto;
  flex-grow: 1;
}
</style>
