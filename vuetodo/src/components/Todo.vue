<template>
  <li class="todo" :class="{ completed: todo.done, editing: editing }">
    <div class="view">
      <input
        type="checkbox"
        class="toggle"
        :checked="todo.done"
        @change="toggleTodo(todo)">
      <label v-text="todo.text" @dblclick="editing = true"></label>
      <button class="destroy" @click="deleteTodo(todo)"></button>
    </div>
    <input class="edit"
      v-show="editing"
      v-focus="editing"
      :value="todo.text"
      @keyup.enter="doneEdit"
      @keyup.esc="cancleEdit"
      @blur="doneEdit" />
  </li>
</template>

<script>
import {
  toggleTodo,
  editTodo,
  deleteTodo
} from '../vuex/actions'

export default {

  name: 'component_todo',

  props: ['todo'],
  vuex: {
    actions: {
      toggleTodo,
      editTodo,
      deleteTodo
    }
  },
  data () {
    return {
      editing: false
    }
  },
  directives: {
    focus (editing) {
      if(editing) {
        this.vm.$nextTick(() => this.el.focus())
      }
    }
  },
  methods: {
    doneEdit (e) {
      const value = e.target.value.trim()
      if(!value) {
        this.deleteTodo(this.todo)
      }else if (this.editing) {
        this.editTodo(this.todo, value)
        this.editing = false

      }
    },
    cancleEdit (e) {
      e.target.value = this.todo.text
      this.editing = false
    }
  }
}
</script>

<style lang="css" scoped>
</style>