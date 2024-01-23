<template>
<el-pagination
  :current-page="pager.pageNum"
  :total="pager.total"
  :page-size="pager.pageSize"
  v-bind="PAGE_ATTR"
  @size-change="onSizeChange"
  @current-change="onPageChange"
/>
</template>

<script>
import {
  PAGE_ATTR, PAGER,
} from './const';

export default {
  name: 'Pagination',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: Object,
      default: () => (PAGER),
    },
  },
  data() {
    return {
      PAGE_ATTR,
    };
  },
  computed: {
    pager() {
      const { value } = this;
      return value || PAGER;
    },
  },
  mounted() {
    // 同步到父组件的分页对象, 防止第一次加载时, 父组件的分页对象为空
    this.$emit('input', PAGER);
  },
  methods: {
    onPageChange(pageNum) {
      this.value.pageNum = pageNum;
      this.$emit('change');
    },
    onSizeChange(pageSize) {
      this.value.pageSize = pageSize;
      this.value.pageNum = 1;
      this.$emit('change');
    },
  },
};
</script>
