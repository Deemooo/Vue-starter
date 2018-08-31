<template>
    <div class="main-right-content-wrap">
      <div class="main">
        <div class="title">添加商铺</div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
          <FormItem label="商铺名称" prop="name">
            <Input v-model="formValidate.name"></Input>
          </FormItem>
          <FormItem label="详细地址" prop="address">
            <AutoComplete
              v-model="formValidate.address"
              @on-select="setAddress"
              @on-change="getAddressData">
              <Option v-for="(item, index) in addressData" :value="item.address" :key="index">{{ item.address }}</Option>
            </AutoComplete>
          </FormItem>
          <FormItem label="联系电话" prop="phone">
            <Input v-model="formValidate.phone"></Input>
          </FormItem>
          <FormItem label="商铺介绍" prop="description">
            <Input v-model="formValidate.description"></Input>
          </FormItem>
          <FormItem label="商铺标语" prop="promotion_info">
            <Input v-model="formValidate.promotion_info"></Input>
          </FormItem>
          <FormItem label="商铺分类" prop="category">
            <Cascader :data="categoryList" v-model="formValidate.category"></Cascader>
          </FormItem>
          <FormItem label="商铺特点">
            <div class="shop-characteristic-wrap">
              <div class="shop-characteristic-item">
                <span class="shop-characteristic-name">品牌保证</span><i-switch v-model="formValidate.is_premium"/>
              </div>
              <div class="shop-characteristic-item">
                <span class="shop-characteristic-name">蜂鸟专送</span><i-switch v-model="formValidate.delivery_mode"/>
              </div>
              <div class="shop-characteristic-item">
                <span class="shop-characteristic-name">新开店铺</span><i-switch v-model="formValidate.new"/>
              </div>
              <div class="shop-characteristic-item">
                <span class="shop-characteristic-name">外卖保</span><i-switch v-model="formValidate.bao"/>
              </div>
              <div class="shop-characteristic-item">
                <span class="shop-characteristic-name">准时达</span><i-switch v-model="formValidate.zhun"/>
              </div>
              <div class="shop-characteristic-item">
                <span class="shop-characteristic-name">开发票</span><i-switch v-model="formValidate.piao"/>
              </div>
            </div>
          </FormItem>
          <FormItem label="配送费" prop="float_delivery_fee">
            <InputNumber :min="0" :max="20" v-model="formValidate.float_delivery_fee"></InputNumber>
          </FormItem>
          <FormItem label="起送价" prop="price">
            <InputNumber :min="0" :max="100" v-model="formValidate.float_minimum_order_amount"></InputNumber>
          </FormItem>
          <FormItem label="营业起始时间" prop="startTime">
            <TimePicker type="time" v-model="formValidate.startTime"></TimePicker>
          </FormItem>
          <FormItem label="营业结束时间" prop="endTime">
            <TimePicker type="time" v-model="formValidate.endTime"></TimePicker>
          </FormItem>
          <FormItem label="店铺头像" prop="image_path" >
            <Upload
              :action="baseUrl + '/v1/addimg/shop'"
              :max-size="2000"
              :on-success="fileUploadSuccess"
              :on-error="fileUploadError"
              type="drag"
              accept="image/*">
              <img-show-wrap :imgSrc="formValidate.image_path" @click.native="uploadType = 'image_path'"></img-show-wrap>
            </Upload>
          </FormItem>
          <FormItem label="营业执照" prop="image_path" >
            <Upload
              :action="baseUrl + '/v1/addimg/shop'"
              :max-size="2000"
              :on-success="fileUploadSuccess"
              :on-error="fileUploadError"
              type="drag"
              accept="image/*">
              <img-show-wrap :imgSrc="formValidate.business_license_image" @click.native="uploadType = 'business_license_image'"></img-show-wrap>
            </Upload>
          </FormItem>
          <FormItem label="餐饮服务许可证" prop="catering_service_license_image" >
            <Upload
              :action="baseUrl + '/v1/addimg/shop'"
              :max-size="2000"
              :on-success="fileUploadSuccess"
              :on-error="fileUploadError"
              type="drag"
              accept="image/*">
              <img-show-wrap :imgSrc="formValidate.catering_service_license_image" @click.native="uploadType = 'catering_service_license_image'"></img-show-wrap>
            </Upload>
          </FormItem>
          <FormItem style="margin-bottom: 10px;">
            <action-button type="primary" text="优惠活动" icon="md-add" @click="modalActivityShow = true"></action-button>
          </FormItem>
          <FormItem>
            <data-table
              :columns="tableActivityColumns"
              :data="tableActivityData"
              :pageShow="false"
              ref="pnsActivityTable">
            </data-table>
          </FormItem>
          <FormItem>
            <div class="footer">
              <action-button type="primary" text="保存" @click="saveFn"></action-button>
            </div>
          </FormItem>
        </Form>
      </div>
      <!--优惠活动新增-->
      <Modal
        title="新增优惠活动"
        width="600"
        v-model="modalActivityShow"
        @on-cancel="closeActivityFn"
        scrollable>
        <Form ref="formActivityValidate" :model="formActivityValidate" :rules="ruleActivityValidate" :label-width="80">
          <FormItem label="优惠活动" prop="name">
            <Select v-model="formActivityValidate.name">
              <Option v-for="(item, index) in activityValueList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="活动详情" prop="description">
            <Input
              type="textarea"
              v-model="formActivityValidate.description"
              :autosize="{minRows: 2,maxRows: 5}"
              :maxlength="50"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <action-button text="取消" @click="closeActivityFn"></action-button>
          <action-button type="primary" text="保存" @click="saveActivityFn"></action-button>
        </div>
      </Modal>
    </div>
</template>
<script>
  import { baseUrl, baseImgPath } from '../../config/env';
  export default {
        components: {},
        computed: {
          iconName () {
            let res = '';
            if (this.formActivityValidate.name === '满减优惠') {
              res = '减';
            } else if (this.formActivityValidate.name === '优惠大酬宾') {
              res = '惠';
            } else if (this.formActivityValidate.name === '新用户立减') {
              res = '新';
            } else if (this.formActivityValidate.name === '进店领券') {
              res = '券';
            }
            return res;
          }
        },
        data () {
            return {
              baseUrl,
              baseImgPath,
              formValidate: {
                name: '',
                address: '',
                phone: '',
                description: '',
                promotion_info: '',
                category: [],
                is_premium: true,
                delivery_mode: true,
                new: true,
                bao: true,
                zhun: true,
                piao: true,
                float_delivery_fee: 5,
                float_minimum_order_amount: 20,
                startTime: '',
                endTime: '',
                image_path: '',
                business_license_image: '',
                catering_service_license_image: '',
                activityValue: ''
              },
              categoryList: [],
              addressData: [],
              address: '',
              city: {},
              activityValueList: [{
                value: '满减优惠',
                label: '满减优惠'
              }, {
                value: '优惠大酬宾',
                label: '优惠大酬宾'
              }, {
                value: '新用户立减',
                label: '新用户立减'
              }, {
                value: '进店领券',
                label: '进店领券'
              }],
              ruleValidate: {
                name: [
                  { required: true, message: '商铺名称不能为空！', trigger: 'blur' },
                  { type: 'string', min: 1, max: 20, message: '商铺名称字符长度必须小于20！', trigger: 'blur' }
                ],
                address: [
                  { required: true, message: '商铺地址不能为空！', trigger: 'blur' },
                  { type: 'string', min: 1, max: 100, message: '商铺地址字符长度必须小于100！', trigger: 'change' }
                ],
                description: [
                  { type: 'string', min: 1, max: 100, message: '商铺描述字符长度必须小于100！', trigger: 'blur' }
                ],
                phone: [
                  { required: true, message: '联系电话不能为空！', trigger: 'blur' },
                  { validator: this.validatePhone, trigger: 'blur' }
                ],
                category: [
                  { required: true, type: 'array',  message: '商铺分类不能为空！', trigger: 'change' },
                  { type: 'array', min: 1, max: 10, message: '商铺分类字符长度必须小于10！', trigger: 'change' }
                ],
                image_path: [],
                is_premium: [],
                delivery_mode: [],
                new: [],
                bao: [],
                zhun: [],
                piao: [],
                float_delivery_fee: [],
                float_minimum_order_amount: [],
                startTime: [],
                endTime: [
                  { validator: this.validateTime, trigger: 'change' }
                ],
                business_license_image: [],
                catering_service_license_image: []
              },
              tableActivityColumns: [
                {key: 'icon_name', title: '活动标题', align: 'center', minWidth: 100},
                {key: 'name', title: '活动名称', align: 'center', minWidth: 100},
                {key: 'description', title: '活动详情', align: 'center', minWidth: 100},
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
                            this.deleteActivityTable(params.row._index);
                          }
                        }
                      })
                    ]);
                  }
                }
              ],
              tableActivityData: [],
              uploadType: 'image_path',
              modalActivityShow: false,
              formActivityValidate: {
                name: '',
                description: ''
              },
              ruleActivityValidate: {
                name: [
                  { required: true, message: '优惠活动不能为空！', trigger: 'change' }
                ],
                description: [
                  { required: true, message: '活动详情不能为空！', trigger: 'blur' }
                ]
              },
              rowIndex: ''
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
          // 获取商铺类型
          getfoodCategory () {
            this.https({url: '/shopping/v2/restaurant/category', method: 'get'}, (response) => {
              if (response) {
                this.setfoodCategory(response);
              }
            });
          },
          // 获取商铺地址
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
          // 商铺保存
          saveFn () {},
          // 优惠活动保存
          saveActivityFn () {
            this.$refs.formActivityValidate.validate((valid) => {
              if (valid) {
                let params = {
                  icon_name: this.iconName,
                  name: this.formActivityValidate.name,
                  description: this.formActivityValidate.description
                };
                this.tableActivityData.push(params);
                this.closeActivityFn();
              } else {
                this.$Message.error('验证失败！');
              }
            });
          },
          // 优惠活动关闭
          closeActivityFn () {
            this.$refs.formActivityValidate.resetFields();
            this.modalActivityShow = false;
          },
          // 优惠活动列表删除
          deleteActivityTable (index) {
            this.tableActivityData.splice(index, 1);
          },
          // 构造商铺种类数据
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
          fileUploadSuccess (tyep, response) {
            let image_path = response.response.image_path;
            if (this.uploadType === 'catering_service_license_image') {
              this.formValidate.catering_service_license_image = baseImgPath + image_path;
            } else if (this.uploadType === 'business_license_image') {
              this.formValidate.business_license_image = baseImgPath + image_path;
            } else if (this.uploadType === 'image_path') {
              this.formValidate.image_path = baseImgPath + image_path;
            }
          },
          fileUploadError (error) {
            this.$Message.error(error);
          }
        },
        mounted () {
          this.getCityInfo();
          this.getfoodCategory();
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
      .shop-characteristic-wrap {
        text-align: left;
        .shop-characteristic-item {
          display: inline-block;
          margin: 0 5px;
          font-weight: 700;
          .shop-characteristic-name {
            margin: 0 5px;
          }
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
