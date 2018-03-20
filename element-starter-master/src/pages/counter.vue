<template>
  <div style="padding: 20px;">
    <span>Clicked: {{ count }} times, count is {{ evenOrOdd }}.</span>
    <div>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="incrementIfOdd">Increment if odd</button>
      <button @click="incrementAsync">Increment async</button>
    </div>
    <div>
      <div>Recent History (last 5 entries):</div>
      <b v-for="n in recentHistory">{{ n }}，</b>
    </div>
  </div>
</template>
<script>
  import store from './store';
  import { mapGetters, mapActions, mapState } from 'vuex';
  export default {
    computed: {
      count () {
        return store.state.count;
      },
      evenOrOdd () {
        return store.getters.evenOrOdd;
      },
      recentHistory () {
        return store.getters.recentHistory;
      }
    },
    methods: {
      increment () {
        store.commit('increment', 'increment');
      },
      decrement () {
        store.commit('decrement', 'decrement');
      },
      incrementIfOdd () {
        store.dispatch('incrementIfOdd');
      },
      incrementAsync () {
        store.dispatch('incrementAsync');
      }
    }
  };
</script>

<style></style>
