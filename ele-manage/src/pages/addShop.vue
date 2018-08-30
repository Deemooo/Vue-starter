<template>
    <div class="main-right-content-wrap">
      <div class="main">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
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
          <FormItem label="店铺头像" prop="image_path">
            <Upload
              :action="baseUrl + '/v1/addimg/shop'"
              :max-size="2000"
              :on-success="fileUploadSuccess"
              :on-error="fileUploadError"
              type="drag"
              accept="image/*">
              <img-show-wrap :imgSrc="formValidate.image_path"></img-show-wrap>
            </Upload>
          </FormItem>
          <FormItem label="营业执照" prop="image_path">
            <Upload
              :action="baseUrl + '/v1/addimg/shop'"
              :max-size="2000"
              :on-success="fileUploadSuccess"
              :on-error="fileUploadError"
              type="drag"
              accept="image/*">
              <img-show-wrap :imgSrc="formValidate.business_license_image"></img-show-wrap>
            </Upload>
          </FormItem>
          <FormItem label="餐饮服务许可证" prop="image_path">
            <Upload
              :action="baseUrl + '/v1/addimg/shop'"
              :max-size="2000"
              :on-success="fileUploadSuccess"
              :on-error="fileUploadError"
              type="drag"
              accept="image/*">
              <img-show-wrap :imgSrc="formValidate.catering_service_license_image"></img-show-wrap>
            </Upload>
          </FormItem>
          <FormItem label="优惠活动" prop="activityValue">
            <Select v-model="formValidate.activityValue" @on-change="selectActive">
              <Option v-for="(item, index) in activityValueList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Form>
        <data-table
          :columns="tableactivityColumns"
          :data="tableactivityData"
          :pageShow="false"
          ref="pnsActivityTable">
        </data-table>
        <div slot="footer">
          <action-button type="primary" text="添加" @click="addShop"></action-button>
        </div>
      </div>
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
                address: '',
                phone: '',
                description: '',
                promotion_info: '',
                category: '',
                is_premium: true,
                delivery_mode: true,
                new: true,
                zhun: true,
                piao: true,
                float_delivery_fee: '',
                float_minimum_order_amount: '',
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
              activityValueList: [],
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
                  { required: true, message: '联系方式不能为空！', trigger: 'blur' },
                  { validator: this.validatePhone, trigger: 'blur' }
                ],
                category: [
                  { required: true, type: 'array',  message: '商铺分类不能为空！', trigger: 'change' },
                  { type: 'array', min: 1, max: 10, message: '商铺分类字符长度必须小于10！', trigger: 'change' }
                ],
                image_path: [
                  { required: true, message: '商铺图片不能为空！', trigger: 'change' }
                ],
                is_premium: [

                ],
                delivery_mode: [

                ],
                new: [
                ],
                bao: [

                ],
                zhun: [

                ],
                piao: [
                ],
                float_delivery_fee: [

                ],
                float_minimum_order_amount: [

                ],
                startTime: [
                ],
                endTime: [

                ],
                business_license_image: [

                ],
                catering_service_license_image: [
                ]
              },
              tableactivityColumns: [
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
                            this.deleteactivityTable(params.row._index);
                          }
                        }
                      })
                    ]);
                  }
                }
              ],
              tableactivityData: []
            };
        },
        methods: {
          addShop () {},
          selectActive () {},
          deleteactivityTable (row, index) {}
        },
        mounted () {
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
      padding: 5%;
      background-color: #f8f8f9;
      border-radius: 10px;
      .shop-characteristic-wrap {
        text-align: left;
        .shop-characteristic-item {
          display: inline-block;
          .shop-characteristic-name {
            margin: 0 5px;
          }
        }
      }
    }
  }
</style>
