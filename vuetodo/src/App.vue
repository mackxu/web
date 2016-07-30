<style src="todomvc-app-css/index.css"></style>
<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="what needs to be done?"
        @keyup.enter="tryAddTodo" />
    </header>
    <!-- main -->
    <section class="main" v-show="todos.length">
      <input class="toggle-all"
        type="checkbox"
        :checked="allChecked"
        @change="toggleAll(!allChecked)" />
      <ul class="todo-list">
        <!-- todo item: 传递todo数据 -->
        <Todo v-for="todo in filteredTodos" :todo="todo"></Todo>
      </ul>
    </section>
    <!-- footer -->
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{remaining}}</strong>
        {{ remaining | pluralize 'item' }} left
      </span>
      <ul class="filters">
        <li v-for="(key, val) of filters">
          <a :href="'#/' + key"
            :class="{ selected: visibility === key }"
            @click="visibility = key">
            {{ key | capitalize }}
          </a>
        </li>
      </ul>
      <button class="clear-completed"
        v-show="todos.length > remaining"
        @click="clearCompleted">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>

import Todo from './components/Todo'
import {
  addTodo,
  toggleAll,
  clearCompleted
} from './vuex/actions'

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

export default {
  components: {
    Todo
  },
  vuex: {
    getters: {
      todos: state => state.todos
    },
    actions: {
      addTodo,
      toggleAll,
      clearCompleted
    }
  },
  data () {
    return {
      visibility: 'all',
      filters: filters
    }
  },
  computed: {
    remaining () {
      return this.todos.filter(todo => !todo.done).length
    },
    allChecked () {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos () {
      return filters[this.visibility].call(this, this.todos)
    }
  },
  methods: {
    tryAddTodo (e) {
      let text = e.target.value
      if (text.trim()) {
        this.addTodo(text)
      }
      e.target.value = ''
    }
  },
  filters: {
    pluralize: (n, w) => n < 2 ? w : (w + 's'),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  }
}
</script>
