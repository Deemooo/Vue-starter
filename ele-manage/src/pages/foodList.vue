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
      :title="winTitle + '食品信息'"
      width="600"
      ok-text="保存"
      cancel-text="取消"
      v-model="modalShow"
      @on-ok="saveFn"
      @on-cancel="closeFn"
      scrollable>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="食品名称" prop="name">
          <Input v-model="formValidate.name"></Input>
        </FormItem>
        <FormItem label="食品分类" prop="category">
          <Cascader :data="categoryList" v-model="formValidate.category"></Cascader>
        </FormItem>
        <FormItem label="食品介绍" prop="description">
          <Input v-model="formValidate.description"></Input>
        </FormItem>
        <FormItem label="食品图片" prop="image_path">
          <Upload
            :action="baseUrl + '/v1/addimg/food'"
            :max-size="2000"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            type="drag"
            accept="image/*">
            <img-show-wrap :imgSrc="formValidate.image_path"></img-show-wrap>
          </Upload>
        </FormItem>
        <Row>
          <Col span="24">
            <action-button text="规格" icon="md-add"></action-button>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <data-table
              :columns="tableStandardColumns"
              :data="tableStandardData"
              :pageShow="false"
              ref="pnsStandardTable">
            </data-table>
          </Col>
        </Row>
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
                    }, '餐馆名称：'),
                    h('span', params.row.restaurant_name)
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
                    }, '食品ID：'),
                    h('span', params.row.item_id)
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
                    }, '食品分类：'),
                    h('span', params.row.category_name)
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
                    }, '月销量：'),
                    h('span', params.row.month_sales)
                  ])
                ])
              ]);
            }
          },
          {key: 'name', title: '食品名称', align: 'center', minWidth: 100},
          {key: 'rating', title: '评分', align: 'center', minWidth: 100},
          {key: 'description', title: '食品介绍', align: 'center', minWidth: 100},
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
        shopId: '',
        formValidate: {
          name: '',
          address: '',
          description: '',
          phone: '',
          category: [],
          image_path: ''
        },
        categoryList: [],
        addressData: [],
        address: '',
        ruleValidate: {
          name: [
            { required: true, message: '食品名称不能为空！', trigger: 'blur' },
            { type: 'string', min: 1, max: 20, message: '食品名称字符长度必须小于20！', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '食品地址不能为空！', trigger: 'blur' },
            { type: 'string', min: 1, max: 100, message: '食品地址字符长度必须小于100！', trigger: 'change' }
          ],
          description: [
            { type: 'string', min: 1, max: 100, message: '食品描述字符长度必须小于100！', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '联系方式不能为空！', trigger: 'blur' },
            { validator: this.validatePhone, trigger: 'blur' }
          ],
          category: [
            { required: true, type: 'array',  message: '食品分类不能为空！', trigger: 'change' },
            { type: 'array', min: 1, max: 10, message: '食品分类字符长度必须小于10！', trigger: 'change' }
          ],
          image_path: [
            { required: true, message: '食品图片不能为空！', trigger: 'change' }
          ]
        },
        restaurantId: '',
        tableStandardColumns: [
          {key: 'name', title: '规格', align: 'center', minWidth: 100},
          {key: 'rating', title: '价格', align: 'center', minWidth: 100},
          {key: 'description', title: '包装费', align: 'center', minWidth: 100},
          {key: 'action',
            title: '操作',
            width: 140,
            align: 'center',
            render: (h, params) => {
              return h('div', {
                attrs: {
                  class: 'table-cell-actions-wrap'
                }
              }, [
                h('action-button', {
                  props: {
                    type: 'warning',
                    text: '修改'
                  },
                  on: {
                    click: () => {
                      this.editStandardTable(params.row);
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
                      this.deleteStandardTable(params.row, params.index);
                    }
                  }
                })
              ]);
            }
          }
        ],
        tableStandardData: []
      };
    },
    methods: {
      // 获取表格数据
      getTableData () {
        let params = this.setStrOfUrl({
          restaurant_id: this.restaurantId,
          offset: this.pageIndex,
          limit: this.pageSize
        });
        this.https({url: '/shopping/v2/foods?' + params, method: 'get'}, (response) => {
          if (response) {
            this.getTableDataTotal();
            this.setTableData(response);
          }
        });
      },
      // 获取总数
      getTableDataTotal () {
        this.https({url: '/shopping/v2/foods/count?restaurant_id=' + this.restaurantId, method: 'get'}, (response) => {
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
      // 获取食品类型
      getfoodCategory () {
        this.https({url: '/shopping/v2/restaurant/category', method: 'get'}, (response) => {
          if (response) {
            this.setfoodCategory(response);
          }
        });
      },
      // 获取食品地址
      getAddressData () {
        let params = this.setStrOfUrl({
          type: 'search',
          city_id: this.city.id,
          keyword: this.formValidate.address
        });
        this.https({url: '/v1/pois?' + params, method: 'get'}, (response) => {
          if (response) {
            if (response && response.length !== 0) {
              this.addressData = response;
            }
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
        this.https({url: '/shopping/v2/food/' + rowData.item_id, params, method: 'delete'}, (response) => {
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
        console.log('rowData', rowData);
        this.winTitle = '修改';
        this.shopId = rowData.id;
        this.$nextTick(() => {
          this.backfillForm(this.formValidate, rowData);
          this.formValidate.category = rowData.category.split('/');
          this.formValidate.image_path = baseImgPath + rowData.image_path;
        });
        this.modalShow = true;
      },
      editStandardTable (rowData) {},
      deleteStandardTable (rowData, index) {},
      // 保存
      saveFn () {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            let params = {...this.formValidate};
            params['category'] = this.formValidate.category.join('/');
            params['id'] = this.shopId;
            Object.assign(params, this.address);
            console.log('params', params);
            this.https({url: '/shopping/updateshop', method: 'post', params}, (response) => {
              if (response.status === 1) {
                this.$Message.success(response.success);
                this.modalShow = false;
                this.getTableData();
              } else {
                this.$Message.error(response.message);
              }
            });
          }
        });
      },
      // 关闭
      closeFn () {
        this.$refs.formValidate.resetFields();
      },
      // 构造表格数据
      setTableData (response) {
        if (response && response.length !== 0) {
          let arr = [];
          response.forEach((item) => {
            let row = {};
            for (let key in item) {
              row[key] = item[key];
            }
            arr.push(row);
          });
          this.tableData = arr;
        }
      },
      // 构造食品种类数据
      setfoodCategory (response) {
        let categories = [...response];
        categories.forEach(item => {
          if (item.sub_categories.length) {
            const addnew = {
              value: item.name,
              label: item.name,
              children: []
            }
            item.sub_categories.forEach((subitem, index) => {
              if (index === 0) {
                return;
              }
              addnew.children.push({
                value: subitem.name,
                label: subitem.name
              })
            })
            this.categoryList.push(addnew)
          }
        })
      },
      // 设置address
      setAddress (val) {
        this.addressData.forEach((item) => {
          Object.keys(item).forEach((key) => {
            if (key === 'address' && item[key] === val) {
              let {address, latitude, longitude} = item;
              this.address = {address, latitude, longitude};
            }
          });
        });
      },
      // 文件上传相关方法
      fileUploadSuccess (response) {
        this.formValidate.image_path = baseImgPath + response.image_path;
      },
      fileUploadError (error) {
        this.$Message.error(error);
      }
    },
    mounted () {
      this.getTableData();
      this.restaurantId = this.$route.query.restaurant_id || '';
    }
  };
</script>

<style lang="less" scoped>
</style>
