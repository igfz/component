export const defaultTreeProps = {
  highlightCurrent: true,
  checkOnClickNode: true,
  expandOnClickNode: true,
  defaultExpandAll: true,
  nodeKey: 'id',
  indent: 12,
  props: {
    children: 'children', label: 'label',
  },
};

export function getTreePathById(tree = [], code = '', key = 'id', sub = 'children', label = 'label') {
  // 根据 子 code 查找 父 路径
  function climb(list, code) {
    for (const i in list) {
      const id = list[i][key];
      const children = list[i][sub];
      const name = list[i][label];
      if (code === id) { return [name]; }
      if (children) {
        const node = climb(children, code);
        if (node) {
          return [
            name, ...node,
          ];
        }
      }
    }
  }
  return climb(tree, code);
}

export function scrollToTreeNode(treeDom) {
  const target = treeDom.$el.querySelector('.is-current>.el-tree-node__content');
  const scrollbarDom = treeDom.$parent;
  if (target) {
    const menu = scrollbarDom.$el.querySelector('.el-scrollbar__wrap');
    scrollIntoView(menu, target);
  }
  scrollbarDom.handleScroll();
}
export function scrollToTreeCheckNode(treeDom) {
  const target = treeDom.$el.querySelector('.is-checked>.el-tree-node__content');
  const scrollbarDom = treeDom.$parent;
  if (target) {
    const menu = scrollbarDom.$el.querySelector('.el-scrollbar__wrap');
    scrollIntoView(menu, target);
  }
  scrollbarDom.handleScroll();
}
function scrollIntoView(container, selected) {
  if (!selected) {
    container.scrollTop = 0;
    return;
  }
  // const element = findClosestVisibleParent(selected);
  // console.log('sel', findClosestVisibleParent(selected));
  container.scrollTop = selected.offsetTop - 80;
}
// 展开所有
export function expandAllTreeNode(treeDom) {
  const { nodesMap } = treeDom.store;
  for (const x in nodesMap) {
    nodesMap[x].expanded = true;
  }
}
