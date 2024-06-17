<template>
  <v-container fluid class="h-100" style="background-color: #ADD8E6;">
    <v-row>
      <v-col class="flex-0-0-0" v-for="status in statuses" :key="status.id">
        <StatusBlock :title="status.title" @add-task="editItem(null, status.id)">
          <TaskCard v-for="task in tasksByStatus[status.id]" :key="task.id" :task="task" @click.native="editItem(task)" />
        </StatusBlock>
      </v-col>
    </v-row>
    <TaskForm v-model="dialog" :item="editedItem" :statuses="statuses" :priorities="priorities" @closeForm="closeForm()"  @refreshTasks="fetchTasks()"/>
  </v-container>
</template>

<script>
import { getPriorities, getStatuses, getTasks } from '@/api'
import StatusBlock from '@/components/StatusBlock.vue';
import TaskCard from '@/components/TaskCard.vue';
import TaskForm from '@/components/TaskForm.vue';

export default {
  components: { StatusBlock, TaskCard, TaskForm },
  data() {
    return {
      dialog: false,
      editedItem: null,
      statuses: [],
      tasks: [],
      priorities: [],
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
    this.fetchPriorities();
  },
  methods: {
    async fetchStatuses() {
      this.statuses = await getStatuses();
    },
    async fetchPriorities() {
      this.priorities = await getPriorities();
    },
    async fetchTasks() {
      this.tasks = await getTasks();
    },
    editItem(item, statusId) {
      if (item === null) {
        this.editedItem = {
          status_id: statusId,
          statusEditable: false,
        };
      } else {
        this.editedItem = {
          ...item,
          statusEditable: true,
        };
      }

      this.dialog = true;
    },
    closeForm() {
      this.editedItem = null;
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
</style>
