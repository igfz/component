<template>
<!-- 输入框 -->
<el-select
  ref="treeselect"
  :value="value"
  :disabled="selectDisabled"
  :size="selectSize"
  :clearable="clearable"
  :placeholder="placeholder"
  :filterable="filterable"
  class="el-treeselect"
  :popper-class="`el-treeselect-popper ${popperClass}`"
  :filter-method="onFilter"
  :default-expanded-keys="[value]"
  @visible-change="onVisibleChange"
  @clear="onClear"
>
  <el-tree
    ref="treeoption"
    v-bind="mergedTreeProps"
    :filter-node-method="filterNode"
    @node-click="onClick"
  >
    <template #default="{ data, node }">
      <slot
        :data="data"
        :node="node"
      >
        <span>{{ node.label }}</span>
      </slot>
    </template>
  </el-tree>
  <!-- 这个保证能展示tree 不能省 -->
  <el-option
    :label="nodeName"
    :value="value"
  />
</el-select>
</template>

<script>
import {
  defaultTreeProps, getTreePathById, scrollToTreeNode,
  expandAllTreeNode,
} from './const';

export default {
  name: 'TreeSelect',
  model: {
    prop: 'value',
    event: 'change',
  },
  inject: {
    elForm: {
      default: '',
    },
    elFormItem: {
      default: '',
    },
  },
  props: {
    value: {
      type: [
        Number,
        String,
      ],
      default: '',
    },
    treeProps: {
      type: Object,
      default: () => ({}),
    },
    disabled: Boolean,
    clearable: Boolean,
    // 默认只能选择子节点, true父节点也可选中
    // true时,expandOnClickNode只能为false, 见113行
    checkStrictly: Boolean,
    // 是否可搜索
    filterable: Boolean,
    levels: {
      type: [
        Number,
        String,
      ],
      default: '',
    },
    popperClass: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
  },
  data() {
    return {
      defaultTreeProps,
    };
  },
  computed: {
    selectDom() {
      return this.$refs['treeselect'];
    },
    treeDom() {
      return this.$refs['treeoption'];
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    mergedTreeProps() {
      const {
        defaultTreeProps, treeProps, checkStrictly,
      } = this;
      const { props: defProps } = defaultTreeProps;
      const { props } = treeProps;
      if (checkStrictly) {
        treeProps.expandOnClickNode = false;
      }
      return {
        ...defaultTreeProps, ...treeProps, props: {
          ...defProps, ...props,
        },
      };
    },
    nodeName: {
      set(v) {},
      get() {
        const {
          value, levels,
        } = this;
        if (value !== undefined && value !== null) {
          const menu = this.getMenuPath(value) || [];
          if (!menu[0]) {
            this.$emit('match', false);
          }
          return menu.slice(-levels).join(' / ');
        }
        return '';
      },
    },
  },
  methods: {
    onClick(data, node) {
      const { checkStrictly } = this;
      const {
        isLeaf, key, isLeafByUser,
      } = node;
      // 非叶节点都要return出去
      // 用户设定props的isLeaf属性, node便有了isLeafByUser属性
      if (!checkStrictly) {
        if (isLeafByUser !== undefined) {
          if (!isLeafByUser) { return; }
        } else {
          // 组件内部 判断叶节点的变量
          if (!isLeaf) { return; }
        }
      }
      this.$emit('change', key);
      this.$emit('node-click', data, node);
      this.onClose();
    },
    filterNode(value, data) {
      const { props } = this.treeProps;
      if (!value) return true;
      return data[props.label].indexOf(value) !== -1;
    },
    onFilter(value) {
      this.treeDom.filter(value);
    },
    onClear() {
      this.$emit('change', '');
      this.treeDom.setCurrentKey(null);
      this.$emit('node-click', null, null);
    },
    onClose() {
      // 选中 关闭 弹窗,并让 select 有获得焦点的样式
      this.selectDom.handleClose();
      this.selectDom.setSoftFocus();
    },
    getMenuPath(code) {
      const {
        data, nodeKey, props,
      } = this.mergedTreeProps;
      const {
        children, label,
      } = props;
        // 根据 子 code 查找 父 路径
      return getTreePathById(data, code, nodeKey, children, label);
    },
    // 帮助聚焦到选中的 元素
    onVisibleChange(visible) {
      const {
        treeDom, value,
      } = this;
      treeDom.setCurrentKey(value);
      expandAllTreeNode(treeDom);
      if (visible) {
        this.onFilter('');  // 清除过滤时遗留的条件
        setTimeout(() => {
          scrollToTreeNode(treeDom);
        }, 0);
      }
    },
  },
};
</script>

<style lang="scss">
@import './index.scss';
</style>

