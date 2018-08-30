<template>
  <div class="main-right-content-wrap">
    <data-table
      :columns="tableColumns"
      :data="tableData"
      :loading="tableLoading"
      :total="tableTotal"
      :current="pageIndex"
      @on-expand="expandChange"
      @on-change="pageChange"
      @on-page-size-change="pageSizeChange"
      ref="pnsTable">
    </data-table>
    <!--商品新增-->
    <Modal
      :title="winTitle + '商品信息'"
      width="600"
      v-model="modalShow"
      @on-cancel="closeFn"
      scrollable>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="商品名称" prop="name">
          <Input v-model="formValidate.name"></Input>
        </FormItem>
        <FormItem label="商品分类" prop="category_id">
          <Select v-model="formValidate.category_id">
            <Option v-for="(item, index) in categoryList" :value="item.value" :key="index">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="商品介绍" prop="description">
          <Input v-model="formValidate.description"></Input>
        </FormItem>
        <FormItem label="商品图片" prop="image_path">
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
          <Col span="24" style="margin-bottom: 10px;">
            <action-button type="primary" text="规格" icon="md-add" @click="addStandard"></action-button>
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
      <div slot="footer">
        <action-button text="取消" @click="closeFn"></action-button>
        <action-button type="primary" text="保存" @click="saveFn"></action-button>
      </div>
    </Modal>
    <!--规格新增-->
    <Modal
      :title="winStandardTitle + '规格信息'"
      width="600"
      v-model="modalStandardShow"
      @on-cancel="closeStandardFn"
      scrollable>
      <Form ref="formStandardValidate" :model="formStandardValidate" :rules="ruleStandardValidate" :label-width="80">
        <FormItem label="规格" prop="specs_name">
          <Input v-model="formStandardValidate.specs_name"></Input>
        </FormItem>
        <FormItem label="包装费" prop="packing_fee">
          <InputNumber :min="1" :max="100" v-model="formStandardValidate.packing_fee"></InputNumber>
        </FormItem>
        <FormItem label="价格" prop="price">
          <InputNumber :min="1" :max="100" v-model="formStandardValidate.price"></InputNumber>
        </FormItem>
      </Form>
      <div slot="footer">
        <action-button text="取消" @click="closeStandardFn"></action-button>
        <action-button type="primary" text="保存" @click="saveStandardFn"></action-button>
      </div>
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
                    }, '餐馆ID：'),
                    h('span', params.row.restaurant_id)
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
                    }, '餐馆地址：'),
                    h('span', params.row.restaurant_address)
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
                    }, '商品ID：'),
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
                    }, '商品分类：'),
                    h('span', params.row.category_name)
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
                    }, '月销量：'),
                    h('span', params.row.month_sales)
                  ])
                ])
              ]);
            }
          },
          {key: 'name', title: '商品名称', align: 'center', minWidth: 100},
          {key: 'rating', title: '评分', align: 'center', minWidth: 100},
          {key: 'description', title: '商品介绍', align: 'center', minWidth: 100},
          {key: 'action',
            title: '操作',
            width: 150,
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
          category_id: '',
          description: '',
          image_path: ''
        },
        categoryList: [],
        addressData: [],
        address: '',
        ruleValidate: {
          name: [
            { required: true, message: '商品名称不能为空！', trigger: 'blur' },
            { type: 'string', min: 1, max: 20, message: '商品名称字符长度必须小于20！', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '商品地址不能为空！', trigger: 'blur' },
            { type: 'string', min: 1, max: 100, message: '商品地址字符长度必须小于100！', trigger: 'change' }
          ],
          description: [
            { type: 'string', min: 1, max: 100, message: '商品描述字符长度必须小于100！', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '联系方式不能为空！', trigger: 'blur' },
            { validator: this.validatePhone, trigger: 'blur' }
          ],
          category_id: [],
          image_path: [
            { required: true, message: '商品图片不能为空！', trigger: 'change' }
          ]
        },
        restaurantId: '',
        tableStandardColumns: [
          {key: 'specs', title: '规格', align: 'center', minWidth: 100},
          {key: 'packing_fee', title: '价格', align: 'center', minWidth: 100},
          {key: 'price', title: '包装费', align: 'center', minWidth: 100},
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
                      this.deleteStandardTable(params.row._index);
                    }
                  }
                })
              ]);
            }
          }
        ],
        tableStandardData: [],
        winStandardTitle: '',
        modalStandardShow: false,
        formStandardValidate: {
          specs_name: '',
          packing_fee: 0,
          price: 20
        },
        ruleStandardValidate: {
          specs_name: [
            { required: true, message: '规格不能为空！', trigger: 'blur' },
            { type: 'string', min: 1, max: 20, message: '规格字符长度必须小于20！', trigger: 'blur' }
          ],
          packing_fee: [
            { type: 'number', required: true, message: '包装费不能为空！', trigger: 'change' }
          ],
          price: [
            { type: 'number', required: true, message: '价格不能为空！', trigger: 'change' }
          ]
        },
        rowIndex: ''
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
      // 获取商品类型
      getMenu (rowData) {
        let params = this.setStrOfUrl({
          restaurant_id: rowData.restaurant_id,
          allMenu: true
        });
        this.https({url: '/shopping/v2/menu?' + params, method: 'get'}, (response) => {
          if (response) {
            this.setfoodCategory(response);
          }
        });
      },
      // 获取商品地址
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
      // 新增规格
      addStandard () {
        this.winStandardTitle = '新增';
        this.modalStandardShow = true;
      },
      // 修改
      editTable (rowData) {
        console.log('rowData', rowData);
        this.winTitle = '修改';
        this.getMenu(rowData);
        this.$nextTick(() => {
          this.backfillForm(this.formValidate, rowData);
          this.setTableStandardData(rowData.specfoods);
          this.formValidate.image_path = baseImgPath + rowData.image_path;
        });
        this.modalShow = true;
      },
      // 商品规格修改
      editStandardTable (rowData) {
        console.log('editStandardTable', rowData);
        this.winStandardTitle = '修改';
        this.rowIndex = rowData._index;
        this.$nextTick(() => {
          this.backfillForm(this.formStandardValidate, rowData);
          this.formStandardValidate.specs_name = rowData.specs;
        });
        this.modalStandardShow = true;
      },
      // 商品规格删除
      deleteStandardTable (index) {
        this.tableStandardData.splice(index, 1);
      },
      // 保存
      saveFn () {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            let subData = {new_category_id: this.formValidate.category_id, specs: this.tableStandardData};
            let params = {...this.formValidate, ...subData};
            console.log('params', params);
            this.https({url: '/shopping/v2/updatefood', method: 'post', params}, (response) => {
              if (response.status === 1) {
                this.$Message.success(response.success);
                this.closeFn();
                this.getTableData();
              } else {
                this.$Message.error(response.message);
              }
            });
          } else {
            this.$Message.error('验证失败！');
          }
        });
      },
      // 关闭
      closeFn () {
        this.modalShow = false;
        this.$refs.formValidate.resetFields();
      },
      // 规格保存
      saveStandardFn () {
        this.$refs.formStandardValidate.validate((valid) => {
          if (valid) {
            if (this.winStandardTitle === '新增') {
              this.tableStandardData.push({...this.formStandardValidate});
            } else {
              this.tableStandardData.splice(this.rowIndex, 1, {...this.formStandardValidate});
            }
            this.closeStandardFn();
          } else {
            this.$Message.error('验证失败！');
          }
        });
      },
      // 规格关闭
      closeStandardFn () {
        this.modalStandardShow = false;
        this.$refs.formStandardValidate.resetFields();
      },
      // 面板展开事件
      async expandChange (row, status) {
        if (status) {
          let restaurant = null;
          let category = null;
          await this.https({url: '/shopping/restaurant/' + row.restaurant_id, method: 'get'}, (response) => {
            if (response) {
              restaurant = response;
            }
          });
          await this.https({url: '/shopping/v2/menu/' + row.category_id, method: 'get'}, (response) => {
            if (response) {
              category = response;
            }
          });
          this.tableData.splice(row.index, 1, {...row, ...{restaurant_name: restaurant.name, restaurant_address: restaurant.address, category_name: category.name, _expanded: true}});
        } else {
          this.tableData.splice(row.index, 1, {...row, ...{_expanded: false}});
        }
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
      // 构造规格表格数据
      setTableStandardData (response) {
        if (response && response.length !== 0) {
          let arr = [];
          response.forEach((item) => {
            let row = {
              specs: item.specs_name,
              packing_fee: item.packing_fee,
              price: item.price
            };
            arr.push(row);
          });
          this.tableStandardData = arr;
        }
      },
      // 构造商品种类数据
      setfoodCategory (response) {
        let categories = [...response];
        this.categoryList = [];
        categories.forEach((item, index) => {
            let addnew = {
              label: item.name,
              value: item.id,
              index
            }
          this.categoryList.push(addnew);
        })
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
