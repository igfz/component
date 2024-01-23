import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from '@/App';

Vue.use(Element, { size: 'mini' });
Vue.config.productionTip = false;

/** **************  全量使用 ****************/
// import ysujcUI from "@ysujc/components";
// import "@ysujc/components/lib/index/style.css";
// Vue.use(ysujcUI);
/** **************  全量使用 ****************/

//  使用按需引用组件
// import Pagination from '@ysujc/lib/Pagination';
// Vue.use(Pagination);
/** **************  基础组件使用 ****************/

new Vue({
  el: `#app`,
  render: h => h(App),
});

