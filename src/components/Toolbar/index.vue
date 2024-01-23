<template>
<section :class="$style.box">
  <div :class="$style.left">
    <slot />
  </div>
  <div :class="$style.right">
    <el-tooltip
      v-if="!filter.includes('search')"
      :content="searcher ? '隐藏搜索' : '显示搜索'"
      placement="top"
    >
      <el-button
        circle
        icon="el-icon-search"
        @click="toggleSearcher"
      />
    </el-tooltip>
    <el-tooltip
      v-if="!filter.includes('refresh')"
      content="刷新"
      placement="top"
    >
      <el-button
        circle
        icon="el-icon-refresh"
        @click="onQuery"
      />
    </el-tooltip>
  </div>
</section>
</template>

<script>

export default {
  name: 'Toolbar',
  props: {
    searcher: {
      type: Boolean,
      default: true,
    },
    filter: {
      type: String,
      default: '',  // 要隐藏的功能
    },
  },
  data() {
    return {
    };
  },
  methods: {
    onQuery() {
      this.$emit('query');
    },
    toggleSearcher() {
      const { searcher } = this;
      this.$emit('update:searcher', !searcher);
      this.$emit('toggle');
    },
  },
};
</script>

<style lang="scss" module>
.box{
  display: flex;
}
.left{
  flex: 1;
}
.right{
  width: 70px;
  text-align: right;
}
</style>
