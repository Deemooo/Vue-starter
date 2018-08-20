<!--
 基于iview的table和pege组件，将表格和分页分装在一起
 简化表格写法
 columns：表格列 Array
 data: 表格数据 Array
 total：总数 Number
 onPageChange() 页码变化事件 Function
 onPageSizeChange() 每页显示数量变化事件 Function
-->
<template>
  <div class="data-table">
    <div class="table">
      <Table
          :columns="columns"
          :data="data"
          :stripe="stripe"
          :border="border"
          :show-header="showHeader"
          :width="width"
          :height="tableHeight"
          :loading="loading"
          :disabled-hover="disabledHover"
          :highlight-row="highlightRow"
          :row-class-name="rowClassName"
          :no-data-text="noDataText"
          :no-filtered-data-text="noFilteredDataText"
          @on-current-change="onCurrentChange"
          @on-select="onSelect"
          @on-select-cancel="onSelectCancel"
          @on-select-all="onSelectAll"
          @on-selection-change="onSelectionChange"
          @on-sort-change="onSortChange"
          @on-filter-change="onFilterChange"
          @on-row-click="onRowClick"
          @on-row-dblclick="onRowDblclick"
          @on-expand="onExpand"
          ref="table"
        ></Table>
    </div>
    <div class="page" v-if="pageShow">
      <Page
        :current.sync="currentPage"
        :total="total"
        :page-size="pageSize"
        :page-size-opts="pageSizeOpts"
        :placement="placement"
        :show-total="true"
        :show-elevator="true"
        :show-sizer="true"
        :class-name="className"
        :styles="styles"
        :transfer="false"
        @on-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
      ></Page>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      // 控制分页是否显示
      pageShow: {
        type: Boolean,
        default () {
          return true;
        }
      },
      // 表格参数，和Iview table保持一致
      data: {
        type: Array,
        default () {
          return [];
        }
      },
      columns: {
        type: Array,
        default () {
          return [];
        }
      },
      // 斑马线
      stripe: {
        type: Boolean,
        default: true
      },
      // 纵向边框
      border: {
        type: Boolean,
        default: true
      },
      // 是否显示表头
      showHeader: {
        type: Boolean,
        default: true
      },
      width: {
        type: [String, Number],
        default: 'auto'
      },
      height: {
        type: [String, Number],
        default: null
      },
      // 表格loading
      loading: {
        type: Boolean,
        default: false
      },
      // 禁用鼠标悬停高亮
      disabledHover: {
        type: Boolean,
        default: false
      },
      // 是否支持高亮选中行，单选
      highlightRow: {
        type: Boolean,
        default: false
      },
      // 行的 className 的回调方法，传入参数 ： row：当前行数据 index：当前行的索引
      rowClassName: {
        type: Function
      },
      // 数据为空是的显示内容
      noDataText: {
        type: String,
        default: '暂无数据'
      },
      // 筛选数据为空时显示的提示内容
      noFilteredDataText: {
        type: String,
        default: '暂无搜索结果'
      },

      // 分页参数 和 iview保持一致
      total: {
        type: Number,
        default: 0
      },
      current: {
        type: Number,
        default: 0
      },
      pageSize: {
        type: Number,
        default: 10
      },
      pageSizeOpts: {
        type: Array,
        default () {
          return [10, 20, 30, 40]
        }
      },
      // 条数下拉框展开方向 bottom top
      placement: {
        type: String,
        default: 'top'
      },
      // 自定义样式类
      className: {
        type: String
      },
      // 自定义样式
      styles: {
        type: Object
      }
    },
    data () {
      return {
        tableHeight: 'auto'
      };
    },
    computed: {
      currentPage: {
        get () {
          return this.current + 1;
        },
        set () {}
      }
    },
    methods: {
      // 单选时间 开启 highlight-row 后有效
      onCurrentChange (currentRow, oldCurrentRow) {
        this.$emit('on-current-change', currentRow, oldCurrentRow);
      },
      // 多选模式下有效，选中某一项时触发 selection：已选项数据 row：刚选择的项数据
      onSelect (selection, row) {
        this.$emit('on-select', selection, row);
      },
      // 在多选模式下有效，取消选中某一项时触发 selection：已选项数据 row：取消选择的项数据
      onSelectCancel (selection, row) {
        this.$emit('on-select-cancel', selection, row);
      },
      // 在多选模式下有效，点击全选时触发 selection：以选项数据
      onSelectAll (selection) {
        this.$emit('on-select-all', selection);
      },
      // 在多选模式下有效，只要选中项发生变化时就会触发 selection：已选项数据
      onSelectionChange (selection) {
        this.$emit('on-select-change', selection);
      },
      // 排序时有效，当点击排序时触发 column：当前列数据 key：排序依据的指标 order：排序的顺序，值为 asc 或 desc
      onSortChange (column, key, order) {
        this.$emit('on-sort-change', column, key, order);
      },
      // 筛选时有效，筛选条件发生变化时触发 columnData 当前列数据
      onFilterChange (columnData) {
        this.$emit('on-filter-change', columnData);
      },
      // 单击某一行时触发 rowData 当前行数据 index 当前行索引
      onRowClick (rowData, index) {
        this.$emit('on-row-click', rowData, index);
      },
      // 双击击某一行时触发 rowData 当前行数据 index 当前行索引
      onRowDblclick (rowData, index) {
        this.$emit('on-row-dblclick', rowData, index);
      },
      // 展开或收起木一行时触发 row：当前行的数据 status：当前的状态
      onExpand (row, status) {
        this.$emit('on-expand', row, status);
      },

      // 导出table数据
      /**
       * filename 文件名，默认为 table.csv
       * original 是否导出为原始数据，默认为 true
       * noHeader 不显示表头，默认为 false
       * columns 自定义导出的列数据
       * data 自定义导出的行数据
       * separator 数据分隔符，默认是逗号(,)
       * quoted 每项数据是否加引号，默认为 false
       **/
      exportCsv ({filename, original, noHeader, columns, data, separator, quoted}) {
        let temp = {filename, original, noHeader, columns, data, separator, quoted};
        this.$refs.table.exportCsv(temp);
      },

      // 页码事件
      onPageChange (page) {
        page--;
        this.$emit('on-change', page);
      },
      onPageSizeChange (pageSize) {
        this.$emit('on-page-size-change', pageSize);
      }
    },
    mounted () {
      if (this.$refs.table) {
        if (this.$refs.table.columns && this.$refs.table.columns.length !== 0) {
          this.$refs.table.columns.forEach((item) => {
            item['tooltip'] = true;
          });
        }
      }
    },
    watch: {},
    components: {}
  };
</script>

<style lang="less" scoped>
  .data-table {
    .table {
      padding-bottom: 12px;
    }
    .page {
      padding-bottom: 5px;
    }
  }
</style>
