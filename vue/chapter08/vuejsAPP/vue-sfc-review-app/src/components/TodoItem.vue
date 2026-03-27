<template>
  <li class="todo-item" @click="$emit('toggle-todo', todo.id)">
    <span :class="{ done: todo.completed }">
      {{ todo.text }} - {{ todo.completed ? "완료" : "미완료" }}
    </span>

    <button @click.stop="$emit('delete-todo', todo.id)">삭제</button>
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  emits: ["toggle-todo", "delete-todo"],
};
</script>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  padding: 10px 12px;
  background: #f5f7fb;
  border-radius: 8px;
}

.done {
  text-decoration: line-through;
  color: #888;
}

button {
  border: none;
  background: #444;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
}
</style>
