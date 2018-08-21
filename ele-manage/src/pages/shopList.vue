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
    <Modal
      :title="winTitle + '店铺信息'"
      ok-text="保存"
      cancel-text="取消"
      v-model="modalShow"
      scrollable>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="店铺名称" prop="name">
          <Input v-model="formValidate.name"></Input>
        </FormItem>
        <FormItem label="详细地址" prop="address">
          <Input v-model="formValidate.address"></Input>
        </FormItem>
        <FormItem label="店铺介绍" prop="description">
          <Input v-model="formValidate.description"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="phone">
          <Input v-model="formValidate.phone"></Input>
        </FormItem>
        <FormItem label="店铺分类" prop="selectedCategory">
          <Select v-model="formValidate.selectedCategory">
            <Option v-for="(item, index) in selectedCategoryList" :value="item.value" :key="index">{{ item.title }}</Option>
          </Select>
        </FormItem>
        <FormItem label="商铺图片" prop="image_path">
          <Upload :action="baseUrl + '/v1/addimg/shop'">
            <img v-if="formValidate.image_path" :src="baseImgPath + formValidate.image_path" class="avatar">
            <Icon v-else type="md-image" />
          </Upload>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import { baseUrl, baseImgPath } from '../../config/env';
  export default {
    data () {
      return {
        baseUrl,
        baseImgPath,
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
                    type: 'warning',
                    text: '修改'
                  },
                  on: {
                    click: () => {
                      this.editTable(params.row);
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
                      this.deleteTable(params.row, params.index);
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
        city: {},
        modalShow: false,
        winTitle: '',
        formValidate: {
          name: '',
          address: '',
          description: '',
          phone: '',
          selectedCategory: '',
          image_path: ''
        },
        selectedCategoryList: [],
        ruleValidate: {
          name: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          address: [
            { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
            { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
          ],
          city: [
            { required: true, message: 'Please select the city', trigger: 'change' }
          ],
          phone: [
            { required: true, message: 'Please select gender', trigger: 'change' }
          ],
          selectedCategory: [
            { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
            { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
          ],
          image_path: [
            { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
          ]
        }
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
        this.$router.push({path: 'addGoods', query: { restaurant_id: rowData.id }});
      },
      // 删除
      deleteTable (rowData, index) {
        let params = {};
        this.https({url: '/shopping/restaurant/' + rowData.id, params, method: 'delete'}, (response) => {
          if (response.status === 1) {
            this.$Message.success(response.success);
            this.tableData.splice(index, 1);
          } else {
            this.$Message.error(response.message);
          }
        });
      },
      // 修改
      editTable (rowData) {
        this.winTitle = '修改';
        this.modalShow = true;
      },
      // 保存
      saveFn () {},
      // 关闭
      closeFn () {},
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
