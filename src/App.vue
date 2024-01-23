<template>
<div id="app">
  <h4>无配置的分页</h4>
  <Pagination
    v-model="pager"
    @change="onQueryRowList"
  />
</div>
</template>

<script>
import Pagination from '@/components/Pagination';

export default {
  name: 'App',
  components: {
    Pagination,
  },
  data() {
    return {
      pager: null,         // 分页条件对象
    };
  },
  methods: {
    onQueryRowList() {
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
