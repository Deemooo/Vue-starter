<template>
  <div class="main-right-content-wrap">
    <data-table
      :columns="tableColumns"
      :data="tableData"
      :loading="tableLoading"
      :total="tableTotal"
      :current="pageIndex"
      @on-change="pageChange"
      @on-page-size-change="pageSizeChange"
      ref="pnsTable">
    </data-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableColumns: [
          {type: 'expand',
            align: 'center',
            width: 50,
            render: (h, params) => {
            return h('div', [
              h('Row', {
                style: {
                  width: 'calc(100% - 50px)',
                  height: '100%',
                  padding: '10px',
                  fontSize: '1.1em'
                }
              }, [
                h('Col', {
                  props: {
                    span: 8
                  },
                  style: {
                    textAlign: 'center'
                  }
                }, [
                  h('span', {
                    style: {
                      fontWeight: '700'
                    }
                  }, '店铺ID：'),
                  h('span', params.row.id)
                ]),
                h('Col', {
                  props: {
                    span: 8
                  },
                  style: {
                    textAlign: 'center'
                  }
                }, [
                  h('span', {
                    style: {
                      fontWeight: '700'
                    }
                  }, '联系电话：'),
                  h('span', params.row.phone)
                ]),
                h('Col', {
                  props: {
                    span: 8
                  },
                  style: {
                    textAlign: 'center'
                  }
                }, [
                  h('span', {
                    style: {
                      fontWeight: '700'
                    }
                  }, '评分：'),
                  h('span', params.row.rating)
                ])
              ]),
              h('Row', {
                style: {
                  width: 'calc(100% - 50px)',
                  height: '100%',
                  padding: '10px',
                  fontSize: '1.1em'
                }
              }, [
                h('Col', {
                  props: {
                    span: 8
                  },
                  style: {
                    textAlign: 'center'
                  }
                }, [
                  h('span', {
                    style: {
                      fontWeight: '700'
                    }
                  }, '销售量：'),
                  h('span', params.row.recent_order_num)
                ]),
                h('Col', {
                  props: {
                    span: 8
                  },
                  style: {
                    textAlign: 'center'
                  }
                }, [
                  h('span', {
                    style: {
                      fontWeight: '700'
                    }
                  }, '分类：'),
                  h('span', params.row.category)
                ])
              ])
            ]);
            }
          },
          {key: 'name', title: '店铺名称', align: 'center', minWidth: 100},
          {key: 'address', title: '店铺地址', align: 'center', minWidth: 100},
          {key: 'description', title: '店铺介绍', align: 'center', minWidth: 100},
          {key: 'action',
            title: '操作',
            width: 240,
            align: 'center',
            render: (h, params) => {
              return h('div', {
                attrs: {
                  class: 'table-cell-actions-wrap'
                }
              }, [
                h('action-button', {
                  props: {
                    type: 'primary',
                    text: '新增'
                  },
                  on: {
                    click: () => {
                      this.addTable(params.row);
                    }
                  }
                }),
                h('action-button', {
                  props: {
                    type: 'error',
                    text: '删除'
                  },
                  on: {
                    click: () => {
                      this.deleteTable(params.row);
                    }
                  }
                }),
                h('action-button', {
                  props: {
                    type: 'warning',
                    text: '修改'
                  },
                  on: {
                    click: () => {
                      this.editTable(params.row);
                    }
                  }
                })
              ]);
            }
          }
        ],
        tableData: [],
        tableLoading: false,
        pageIndex: 0,
        pageSize: 20,
        tableTotal: 0,
        city: {}
      };
    },
    methods: {
      // 获取表格数据
      getTableData () {
        let {latitude, longitude} = this.city;
        let params = this.setStrOfUrl({
          latitude,
          longitude,
          offset: this.pageIndex,
          limit: this.pageSize
        });
        this.https({url: '/shopping/restaurants?' + params, method: 'get'}, (response) => {
          if (response) {
            this.getTableDataTotal();
            this.setTableData(response);
          }
        });
      },
      // 获取总数
      getTableDataTotal () {
        this.https({url: '/shopping/restaurants/count', method: 'get'}, (response) => {
          if (response.status === 1) {
            this.tableTotal = response.count;
          }
        });
      },
      // 获取定位城市
      getCityInfo () {
        this.https({url: '/v1/cities?type=guess', method: 'get'}, (response) => {
          if (response) {
            this.city = response;
            this.getTableData();
          }
        });
      },
      // 新增
      addTable (rowData) {
      },
      // 删除
      deleteTable (rowData) {},
      // 修改
      editTable (rowData) {},
      // 构造表格数据
      setTableData (response) {
        if (response && response.length !== 0) {
          response.forEach((item) => {
            let row = {};
            for (let key in item) {
              row[key] = item[key];
            }
            this.tableData.push(row);
          });
        }

      }
    },
    mounted () {
      this.getCityInfo();
    }
  };
</script>

<style lang="less" scoped>
</style>
