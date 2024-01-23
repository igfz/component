
/**
 * 分页组件默认配置
 */
export const PAGE_ATTR = {
  layout: 'total, sizes, prev, pager, next, jumper',
  background: true,
  pageSizes: [
    10, 20, 30, 50, 100,
  ],
};
// 分页初始化对象
export const PAGER = {
  pageNum: 1,         // 分页对象, 默认第一页
  pageSize: 20,       // 每页条数
  total: 0,           // 总页数
};
