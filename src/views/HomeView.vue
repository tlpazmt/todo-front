<template>
  <v-container fluid class="h-100" style="background-color: #ADD8E6;">
    <v-row>
      <v-col class="flex-0-0-0" v-for="status in statuses" :key="status.id">
        <StatusBlock :title="status.title">
          <TaskCard v-for="task in tasksByStatus[status.id]" :key="task.id" :task="task" />
        </StatusBlock>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getStatuses, getTasks } from '@/api';
import StatusBlock from '@/components/StatusBlock.vue';
import TaskCard from '@/components/TaskCard.vue';

export default {
  components: { StatusBlock, TaskCard },
  data() {
    return {
      statuses: [],
      tasks: [],
    };
  },
  computed: {
    tasksByStatus() {
      return this.tasks.reduce((groups, task) => {
        if (!groups[task.status_id]) {
          groups[task.status_id] = [];
        }
        groups[task.status_id].push(task);
        return groups;
      }, {});
    },
  },
  created() {
    this.fetchStatuses();
    this.fetchTasks();
  },
  methods: {
    async fetchStatuses() {
      this.statuses = await getStatuses();
    },
    async fetchTasks() {
      this.tasks = await getTasks();
    },
  },
};
</script>

<style scoped>
</style>
