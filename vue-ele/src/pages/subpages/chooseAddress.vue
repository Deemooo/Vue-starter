<template>
    <div class="choose-address">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="choose-address-title">选择地址</span>
        </template>
      </top-header>
      <router-link to="/addAddress" class="add-address-footer" >
        <img src="../../assets/icon/add_address.png" height="24" width="24">
        <span>新增收货地址</span>
      </router-link>
      <section class="address-list-wrap">
        <section class="normal-address">
          <ul class="deliverable-address">
            <li v-for="(item, index) in deliverable" :key="index" @click="chooseAddress(item, index)" class="address-item">
              <svg class="choosed-address" :class="{'default-address': defaultIndex === index}">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
              </svg>
              <div class="address-info">
                <header>
                  <span class="name">{{item.name}}</span>
                  <span>{{item.sex == 1? '先生' : '女士'}}</span>
                  <span>{{item.phone}}</span>
                </header>
                <div class="address-detail ellipsis">
                  <span v-if="item.tag" :style="{backgroundColor: iconColor(item.tag)}">{{item.tag}}</span>
                  <p>{{item.address_detail}}</p>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <section v-if="deliverdisable.length" class="normal-address">
            <header class="deliverdisable-header">以下地址超出配送范围</header>
            <ul class="deliverable-address">
              <li v-for="(item, index) in deliverdisable" :key="index" class="address-item deliverable-address-item">
                <svg class="choosed-address">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                </svg>
                <div class="address-info">
                  <header>
                    <span class="name">{{item.name}}</span>
                    <span>{{item.sex == 1? '先生' : '女士'}}</span>
                    <span>{{item.phone}}</span>
                  </header>
                  <div class="address-detail ellipsis">
                    <span v-if="item.tag" :style="{backgroundColor: '#ccc', color: '#fff'}">{{item.tag}}</span>
                    <p>{{item.address_detail}}</p>
                  </div>
                </div>
              </li>
            </ul>
          </section>
      </section>
    </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex';
  export default {
    components: {},
    computed: {
      ...mapState([
        'USERINFO',
        'DEFAULTADDRESSINDEX'
      ]),
      defaultIndex () {
        return this.DEFAULTADDRESSINDEX || 0;
      }
    },
    data () {
        return {
          shopId: '',
          deliverable: [],
          deliverdisable: []
        };
    },
    methods: {
      ...mapMutations([
        'SETDEFAULTADDRESS'
      ]),
      //地址备注颜色
      iconColor (name) {
        let color = '';
        if (name === '公司') {
          color = '@btnColor';
        } else if (name === '学校') {
          color = '@blue';
        }
        return color;
      },
      // 获取地址列表
      getAddressList () {
        this.https({url: '/v1/users/' + this.USERINFO.user_id + '/addresses', method: 'get'}).then(
          (res) => {
            res.forEach(item => {
              if (item.is_deliverable) {
                this.deliverable.push(item);
              } else {
                this.deliverdisable.push(item);
              }
            });
          });
      },
      // 选取地址
      chooseAddress (item, index) {
        this.SETDEFAULTADDRESS({address: item, index});
        this.$router.push({path: '/confirmOrder', query: {shopId: this.shopId}});
      }
    },
    created () {
      this.shopId = this.$route.query.shopId;
      if (this.USERINFO && this.USERINFO.user_id) {
        this.getAddressList();
      }
    },
    mounted () {
    },
    watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .choose-address {
    width: 100%;
    overflow-y: auto;
    position: relative;
    color: #fff;
    svg {
      box-sizing: border-box;
    }
    .arrow-left {
      margin-left: .4rem;
      flex: 0 0 33.333%;
      height: .8rem;
    }
    .choose-address-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      text-align: center;
      font-weight: 700;
      color: #fff;
    }
    .add-address-footer {
      position: fixed;
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 2.5rem;
      background-color: #fff;
      z-index: 10;
      span {
        margin-left: .3rem;
        font-size: .7rem;
        color: @blue;
      }
    }
    .address-list-wrap {
      margin-top: 1.95rem;
      margin-bottom: 2.5rem;
      .normal-address {
        .deliverdisable-header {
          font-size: .7rem;
          color: @fontColor;
          text-align: center;
        }
        .deliverable-address {
          .address-item {
            display: flex;
            align-items: center;
            padding: .7rem;
            border-bottom: .025rem solid @gray;
            line-height: 1rem;
            .choosed-address {
              width: .8rem;
              height: .8rem;
              margin-right: .4rem;
              fill: @btnColor;
              opacity: 0;
            }
            .default-address {
              opacity: 1;
            }
            .address-info {
              header {
                span {
                  font-size: .7rem;
                  color: @fontColor;
                }
                .name {
                  font-size: .8rem;
                  font-weight: 700;
                }
              }
              .address-detail {
                display: flex;
                align-items: center;
                span {
                  height: .6rem;
                  padding: .1rem .2rem;
                  margin-right: .3rem;
                  border-radius: .15rem;
                  line-height: .6rem;
                  font-size: .5rem;
                  color: #fff;
                }
                p {
                  font-size: .6rem;
                  color: @fontColor2;
                }
              }
            }
          }
          .deliverable-address-item {
            background-color: @backColor;
          }
        }
      }
    }
  }
</style>
