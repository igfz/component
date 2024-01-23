import TreeSelect from './TreeSelect';
import Toolbar from './Toolbar';
import Pagination from './Pagination';

const components = [
  TreeSelect,
  Toolbar,
  Pagination,
];

const install = Vue => {
  if (install.installed) {
    return;
  }
  components.forEach(Component => {
    Vue.component(Component.name, Component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...components,
};
