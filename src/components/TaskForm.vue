<template>
  <v-dialog :value="dialog" @input="$emit('update:dialog', $event)" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="editedItem.title" label="Название" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="editedItem.description" label="Описание"></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-select v-model="editedItem.status_id" :items="statuses" item-text="title" item-value="id" :readonly="!editedItem.statusEditable" label="Статус" required></v-select>
            </v-col>
            <v-col cols="12">
              <v-select v-model="editedItem.priority_id" :items="priorities" item-text="title" item-value="id" label="Приоритет" required></v-select>
            </v-col>
            <v-col cols="12" v-if="editedItem.id">
              <v-text-field :model-value="formatDate(editedItem.created_at)" label="Дата создания" readonly ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="close">Отмена</v-btn>
        <v-btn color="blue darken-1" @click="save">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { createTask, editTask } from '@/api.js'

export default {
  props: {
    dialog: Boolean,
    item: Object,
    statuses: Array,
    priorities: Array
  },
  data() {
    return {
      editedItem: {},
      defaultItem: {
        title: '',
        description: '',
        status_id: null,
        priority_id: null,
        created_at: null
      }
    };
  },
  computed: {
    formTitle () {
      return this.editedItem.id ? 'Редактировать задачу' : 'Новая задача'
    }
  },
  watch: {
    item (item) {
      this.editedItem = Object.assign({}, item);
    },
    dialog (dialog) {
      if (!dialog) {
        this.close();
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:dialog', false);
      this.editedItem = Object.assign({}, this.defaultItem);
      this.$emit('closeForm');
    },
    async save() {
      if (this.editedItem.id) {
        const response = await editTask(this.editedItem);
      } else {
        const response = await createTask(this.editedItem);
      }

      this.$emit('refreshTasks');
      this.close();
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('ru', options);
    },
  }
}
</script>
