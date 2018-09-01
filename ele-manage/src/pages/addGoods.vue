<template>
  <div class="main-right-content-wrap">
    <div class="main">
      <div class="title">添加商品</div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="商品名称" prop="name">
          <Input v-model="formValidate.name"></Input>
        </FormItem>
        <FormItem label="商品活动" prop="activity">
          <Input v-model="formValidate.activity"></Input>
        </FormItem>
        <FormItem label="商品图片" prop="image_path" >
          <Upload
            :action="baseUrl + '/v1/addimg/food'"
            :max-size="2000"
            :show-upload-list="false"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            type="drag"
            accept="image/*">
            <img-show-wrap :imgSrc="formValidate.image_path"></img-show-wrap>
          </Upload>
        </FormItem>
        <FormItem label="商品详情" prop="description">
          <Input v-model="formValidate.description"></Input>
        </FormItem>
        <FormItem label="商品种类" prop="category_id">
          <Select v-model="formValidate.category_id">
            <Option v-for="(item, index) in categoryList" :value="item.id" :key="index">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Collapse @on-change="closeCategoryFn">
            <Panel name="1">
              添加商品分类
              <div slot="content">
                <Form ref="categoryForm" :model="categoryForm" :rules="ruleCategoryValidate" :label-width="120">
                  <FormItem label="种类名称" prop="name" class="category-formItem-wrap">
                    <Input v-model="categoryForm.name" class="input-wrap"></Input>
                  </FormItem>
                  <FormItem label="种类描述" prop="description" class="category-formItem-wrap">
                    <Input v-model="categoryForm.description" class="input-wrap"></Input>
                  </FormItem>
                  <FormItem>
                    <div class="footer">
                      <action-button type="primary" text="保存" @click="saveCategoryFn"></action-button>
                    </div>
                  </FormItem>
                </Form>
              </div>
            </Panel>
          </Collapse>
        </FormItem>
        <FormItem label="商品特点">
          <Select v-model="formValidate.attribute" multiple>
            <Option v-for="(item, index) in attributeList" :value="item.value" :key="index">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="商品规格">
          <RadioGroup v-model="foodSpecs">
            <Radio label="one">
              <span>单规格</span>
            </Radio>
            <Radio label="more">
              <span>多规格</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <div v-if="foodSpecs === 'one'">
          <FormItem label="包装费" prop="packing_fee">
            <InputNumber :min="1" :max="100" v-model="tableStandardData[0].packing_fee"></InputNumber>
          </FormItem>
          <FormItem label="价格" prop="price">
            <InputNumber :min="1" :max="100" v-model="tableStandardData[0].price"></InputNumber>
          </FormItem>
        </div>
        <div v-else>
          <FormItem style="margin-bottom: 10px;">
            <action-button type="primary" text="规格" icon="md-add" @click="addStandard"></action-button>
          </FormItem>
          <FormItem>
            <data-table
              :columns="tableStandardColumns"
              :data="tableStandardData"
              :pageShow="false"
              ref="pnsStandardTable">
            </data-table>
          </FormItem>
        </div>
        <FormItem>
          <div class="footer">
            <action-button type="primary" text="保存" @click="saveFn"></action-button>
          </div>
        </FormItem>
      </Form>
    </div>
    <!--规格新增-->
    <Modal
      title="新增规格信息"
      width="600"
      v-model="modalStandardShow"
      @on-cancel="closeStandardFn"
      scrollable>
      <Form ref="formStandardValidate" :model="formStandardValidate" :rules="ruleStandardValidate" :label-width="80">
        <FormItem label="规格" prop="specs">
          <Input v-model="formStandardValidate.specs"></Input>
        </FormItem>
        <FormItem label="包装费" prop="packing_fee">
          <InputNumber :min="1" :max="100" v-model="formStandardValidate.packing_fee"></InputNumber>
        </FormItem>
        <FormItem label="价格" prop="price">
          <InputNumber :min="1" :max="100" v-model="formStandardValidate.price"></InputNumber>
        </FormItem>
      </Form>
      <div class="footer">
        <action-button text="取消" @click="closeStandardFn"></action-button>
        <action-button type="primary" text="保存" @click="saveStandardFn"></action-button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import { baseUrl, baseImgPath } from '../../config/env';
  export default {
    components: {},
    computed: {},
    data () {
      return {
        baseUrl,
        baseImgPath,
        formValidate: {
          name: '',
          activity: '',
          image_path: '',
          description: '',
          category_id: '',
          attribute: []
        },
        foodSpecs: 'one',
        categoryList: [],
        attributeList: [
          {
            value: '新',
            label: '新品'
          }, {
            value: '招牌',
            label: '招牌'
          }
        ],
        addressData: [],
        ruleValidate: {
          name: [
            { required: true, message: '商品名称不能为空！', trigger: 'blur' },
            { type: 'string', min: 1, max: 20, message: '商品名称字符长度必须小于20！', trigger: 'blur' }
          ],
          activity: [
            { required: true, message: '商品活动不能为空！', trigger: 'blur' },
            { type: 'string', min: 1, max: 100, message: '商品活动字符长度必须小于100！', trigger: 'blur' }
          ],
          description: [
            { type: 'string', min: 1, max: 100, message: '商品描述字符长度必须小于100！', trigger: 'blur' }
          ],
          category_id: [
            { required: true, type: 'number', message: '商品分类不能为空！', trigger: 'change' }
          ],
          attribute: [
            { required: true, message: '商品特点不能为空！', trigger: 'blur' }
          ]
        },
        categoryForm: {
          name: '',
          description: ''
        },
        ruleCategoryValidate: {
          name: [
            { required: true, message: '商品种类不能为空！', trigger: 'blur' },
            { type: 'string', min: 1, max: 20, message: '商品名称字符长度必须小于20！', trigger: 'blur' }
          ],
          description: [
            { type: 'string', min: 1, max: 100, message: '种类描述字符长度必须小于100！', trigger: 'blur' }
          ]
        },
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
        tableStandardData: [
          {
            specs: '默认',
            packing_fee: 0,
            price: 20
          }
        ],
        modalStandardShow: false,
        formStandardValidate: {
          specs: '',
          packing_fee: 0,
          price: 20
        },
        ruleStandardValidate: {
          specs: [
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
        restaurantId: ''
      };
    },
    methods: {
      // 获取定位城市
      getCityInfo () {
        this.https({url: '/v1/cities?type=guess', method: 'get'}, (response) => {
          if (response) {
            this.city = response;
          }
        });
      },
      // 获取商品类型
      getfoodCategory () {
        this.https({url: '/shopping/getcategory/' + this.restaurantId, method: 'get'}, (response) => {
          if (response) {
            this.setfoodCategory(response.category_list);
          }
        });
      },
      // 商品保存
      saveFn () {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            let params = {...this.formValidate};
            params['specs'] = this.tableStandardData;
            params['restaurant_id'] = this.restaurantId || '';
            console.log('params', params);
            this.https({url: '/shopping/addfood', method: 'post', params}, (response) => {
              if (response.status === 1) {
                this.$Message.success(response.sussess);
                this.closeFn();
              } else {
                this.$Message.error(response.message);
              }
            });
          } else {
            this.$Message.error('验证失败！');
          }
        });
      },
      // 商品关闭
      closeFn () {
        this.formValidate.float_delivery_fee = 5;
        this.formValidate.float_minimum_order_amount = 20;
        this.formValidate.image_path = '';
        this.tableStandardData = [];
        this.$refs.formValidate.resetFields();
      },
      // 商品种类保存
      saveCategoryFn () {
        this.$refs.categoryForm.validate((valid) => {
          if (valid) {
            let params = {
              name: this.categoryForm.name,
              description: this.categoryForm.description,
              restaurant_id: this.restaurantId
            };
            this.https({url: '/shopping/addcategory', method: 'post', params}, (response) => {
              if (response.status === 1) {
                this.$Message.success(response.success);
                this.getfoodCategory();
                this.closeCategoryFn();
              } else {
                this.$Message.error(response.message);
              }
            });
          } else {
            this.$Message.error('验证失败！');
          }
        });
      },
      // 商品种类关闭
      closeCategoryFn () {
        this.$refs.categoryForm.resetFields();
      },
      // 新增规格
      addStandard () {
        this.modalStandardShow = true;
      },
      // 规格保存
      saveStandardFn () {
        this.$refs.formStandardValidate.validate((valid) => {
          if (valid) {
            this.tableStandardData.push({...this.formStandardValidate});
            this.closeStandardFn();
          } else {
            this.$Message.error('验证失败！');
          }
        });
      },
      // 规格关闭
      closeStandardFn () {
        this.$refs.formStandardValidate.resetFields();
        this.modalStandardShow = false;
      },
      // 规格列表删除
      deleteStandardTable (index) {
        this.tableStandardData.splice(index, 1);
      },
      // 构造商品种类数据
      setfoodCategory (response) {
        [...response].map((item, index) => {
          item.label = item.name;
        });
        this.categoryList = [...response];
      },
      // 文件上传相关方法
      fileUploadSuccess (response) {
        this.formValidate.image_path = baseImgPath + response.image_path;
      },
      fileUploadError (error) {
        this.$Message.error(error);
      }
    },
    mounted () {},
    activated () {
      if (this.$route.query.restaurant_id) {
        this.restaurantId = this.$route.query.restaurant_id;
        this.getfoodCategory();
      }
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
  .main-right-content-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .main {
      width: 80%;
      margin: auto;
      margin-top: 20px;
      padding: 10px 5%;
      background-color: #f8f8f9;
      border-radius: 10px;
      .category-formItem-wrap {
        display: flex;
        margin: 10px 0;
        .input-wrap {
          width: 600px;
        }
      }
      .title {
        font-size: 1.5em;
        font-weight: 900;
        text-align: center;
        padding: 10px;
      }
      .footer {
        text-align: center;
      }
    }
  }
</style>
