<template>
    <div class="shop">
      <img :src="imgBaseUrl + shopDetail.image_path" class="shop-info-bg">
      <top-header class="shop-header">
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
        </template>
      </top-header>
      <div class="shop-info">
        <div class="shop-info-left">
          <img :src="imgBaseUrl + shopDetail.image_path">
        </div>
        <router-link div="tag" to="shopDetail" class="shop-info-right">
          <div class="shop-info-right-text">
            <div class="shop-name">
              {{ shopDetail.name }}
            </div>
            <div class="shop-desc">
              商家配送／{{ shopDetail.order_lead_time }}分钟送达／配送费¥{{ shopDetail.float_delivery_fee }}
            </div>
            <div class="shop-promotion">
              公告：{{ this.shopDetail.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。' }}
            </div>
          </div>
          <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
            <path d="M0 0 L8 7 L0 14"  stroke="#fff" stroke-width="1" fill="none"/>
          </svg>
        </router-link>
      </div>
      <div class="tabs-title">
        <span :class="{selected: tabType === 0}" @click="tabType = 0">商品</span>
        <span :class="{selected: tabType === 1}" @click="tabType = 1">评价</span>
      </div>
      <!--商品-->
      <div v-show="tabType === 0" id="wrapper-menu" ref="wrapperMenu" class="shop-food-wrap">
        <!--商品种类列表-->
        <ul class="food-menu">
          <li v-for="(item,index) in menuList"
              :key="index"
              @click="chooseMenu(index)"
              :class="{'activity-menu': index === menuIndex}"
              class="menu-list-item">
            <span>{{ item.name }}</span>
          </li>
        </ul>
        <!--商品列表-->
        <div class="food-list" ref="menuFoodList">
          <ul>
            <li v-for="(item, index) in menuList" :key="index" class="food-item">
              <header class="food-item-header">
                <span class="name">{{ item.name }}</span>
                <span class="description">{{ item.description }}</span>
              </header>
              <section v-for="(foods, foodIndex) in item.foods" :key="foodIndex" class="food-item-info">
                <router-link
                  :to="{path: '/foodDetail', query: {image_path: foods.image_path, description: foods.description, month_sales: foods.month_sales, name: foods.name, rating: foods.rating, rating_count: foods.rating_count, satisfy_rate: foods.satisfy_rate, foods, shopId}}"
                  tag="div" class="food-item-info-top">
                  <img :src="imgBaseUrl + foods.image_path" class="food-img">
                  <div class="food-desc">
                    <div class="food-desc-name">
                      <span class="food-name">{{ foods.name }}</span>
                      <ul v-if="foods.attributes.length" class="attributes-list">
                        <li v-for="(attribute, attributeIndex) in foods.attributes"
                            v-if="attribute"
                            :key="attributeIndex"
                            :style="{color: '#' + attribute.icon_color, borderColor:'#' + attribute.icon_color}"
                            :class="{'attribute-new' : attribute.icon_name === '新'}">
                            <span :style="{color: attribute.icon_name == '新'? '#fff' : '#' + attribute.icon_color}">
                              {{ attribute.icon_name === '新' ? '新品' : attribute.icon_name }}
                            </span>
                        </li>
                      </ul>
                    </div>
                    <div v-if="foods.description" class="food-desc-content">
                      {{ foods.description }}
                    </div>
                    <div class="food-desc-rating">
                      <span>月售{{ foods.month_sales }}份</span>
                      <span>好评率{{ foods.satisfy_rate }}%</span>
                    </div>
                    <div class="food-desc-activity">
                        <span v-if="foods.activity" :style="{color: '#' + foods.activity.image_text_color, borderColor:'#' + foods.activity.icon_color}">
                          {{ foods.activity.image_text }}
                        </span>
                    </div>
                  </div>
                </router-link>
                <footer class="food-item-info-bottom">
                  <section class="food-price">
                    <span class="price-icon">¥</span>
                    <span class="price-num">{{ foods.specfoods[0].price }}</span>
                    <span v-if="foods.specifications.length" class="price-special">起</span>
                  </section>
                </footer>
              </section>
            </li>
          </ul>
        </div>
        <!--购物车-->
        <section class="buy-cart-container">
          <section @click="toggleCartList" class="cart-icon-num">
            <div class="cart-icon-container" :class="{cart_icon_activity: totalPrice > 0, move_in_cart:receiveInCart}" ref="cartContainer">
                                <span v-if="totalNum" class="cart-list-length">
                                    {{totalNum}}
                                </span>
              <svg class="cart-icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
              </svg>
            </div>
            <div class="cart-num">
              <p>¥ {{totalPrice}}</p>
              <p>配送费¥{{deliveryFee}}</p>
            </div>
          </section>
          <section class="gotopay" :class="{gotopay_acitvity: minimumOrderAmount <= 0}">
            <span class="gotopay-text" v-if="minimumOrderAmount > 0">还差¥{{minimumOrderAmount}}起送</span>
            <router-link :to="{path:'/confirmOrder', query:{shopId}}" class="gotopay-text" v-else>去结算</router-link>
          </section>
        </section>
      </div>
      <!--评价-->
      <div v-load-more="loaderMoreRating" v-show="tabType === 1" class="shop-rating-wrap">
        <header class="shop-rating-header">
          <div class="header-left">
            <div class="shop-rating-num">{{ shopDetail.rating }}</div>
            <div class="shop-rating-text">综合评价</div>
            <div v-if="ratingScoresData.compare_rating" class="shop-rating-compa">
              高于周边商家{{ (ratingScoresData.compare_rating * 100).toFixed(1) }}%
            </div>
          </div>
          <div class="header-right">
            <div>
              <span class="header-right-title">服务态度</span>
              <rating-star :rating='ratingScoresData.service_score'></rating-star>
              <span v-if="ratingScoresData.service_score" class="rating-num">
                    {{ ratingScoresData.service_score.toFixed(1) }}
                  </span>
            </div>
            <div>
              <span class="header-right-title">菜品评价</span>
              <rating-star :rating='ratingScoresData.food_score'></rating-star>
              <span v-if="ratingScoresData.food_score" class="rating-num">
                    {{ ratingScoresData.food_score.toFixed(1) }}
                  </span>
            </div>
            <div>
              <span class="header-right-title">送达时间</span>
              <span class="delivery-time">{{shopDetail.order_lead_time}}分钟</span>
            </div>
          </div>
        </header>
        <section class="shop-rating-content">
          <ul class="rating-tag-list">
            <li v-for="(item, index) in ratingTagsList"
                :key="index"
                :class="{unsatisfied: item.unsatisfied, 'tag-activity': ratingTageIndex === index}"
                @click="changeTag(index, item.name)">
              {{ item.name }}({{ item.count }})
            </li>
          </ul>
          <ul class="user-rating-list">
            <li v-for="(item, index) in ratingList" :key="index" class="rating-item">
              <img :src="getImgPath(item.avatar)" class="user-avatar">
              <div class="rating-info">
                <div class="rating-info-top">
                  <div class="rating-info-top-left">
                    <p class="user-name">{{ item.username }}</p>
                    <p class="rating-star">
                      <rating-star :rating='item.rating_star'></rating-star>
                      <span class="rating-star-text">{{ item.time_spent_desc }}</span>
                    </p>
                  </div>
                  <time class="rating-info-top-right">{{ item.rated_at }}</time>
                </div>
                <div class="rating-info-middle">
                  <ul class="food-img-list">
                    <li v-for="(item, index) in item.item_ratings" :key="index">
                      <img :src="getImgPath(item.image_hash)" v-if="item.image_hash">
                    </li>
                  </ul>
                </div>
                <div class="rating-info-bottom">
                  <ul class="food-name-list">
                    <li v-for="(item, index) in item.item_ratings" :key="index" class="food-name-item">
                      {{ item.food_name }}
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex';
  import { imgBaseUrl } from '../../config/env';
  import { loadMore } from '../publicFn/loadMore';
  import ratingStar from '../components/ratingStar';
  import BScroll from 'better-scroll';
  export default {
    mixins: [loadMore],
    components: {
      ratingStar
    },
    computed: {
      ...mapState([
        'userInfo',
        'GEOHASH'
      ])
    },
    data () {
        return {
          imgBaseUrl,
          shopId: '',
          shopDetail: {},
          tabType: 0,
          menuList: [],
          ratingScoresData: {},
          ratingTagsList: [],
          ratingTageIndex: '',
          ratingOffset: 0,
          ratingTagName: '',
          ratingList: [],
          shopListTop: [],
          foodScroll: null,
          menuIndexChange: true,
          menuIndex: 0,
          totalPrice: 0,
          totalNum: 0,
          receiveInCart: '',
          deliveryFee: 0,
          minimumOrderAmount: 0
        };
    },
    methods: {
      ...mapMutations([
        'SAVEGEOHASH',
        'SAVESHOPDETAIL'
      ]),
      // 获取商铺信息
      getShopDetail () {
        let params = this.setStrOfUrl({
          latitude: this.GEOHASH.split(',')[0],
          longitude: this.GEOHASH.split(',')[1]
        });
        this.https({url: '/shopping/restaurant/' + this.shopId + params, method: 'get'}).then(
          (res) => {
            this.shopDetail = res;
            this.SAVESHOPDETAIL(res);
          });
      },
      // 获取列表信息
      getMenuList () {
        this.https({url: '/shopping/v2/menu?restaurant_id=' + this.shopId, method: 'get'}).then(
          (res) => {
            this.menuList = res;
            this.$nextTick(() => {
              this.getFoodListHeight();
            });
          });
      },
      // 获取商铺评价
      getShopRating () {
        this.https({url: '/ugc/v2/restaurants/' + this.shopId + '/ratings/scores', method: 'get'}).then(
          (res) => {
            this.ratingScoresData = res;
          });
      },
      // 获取商铺评价标签
      getShopRatingTag () {
        this.https({url: '/ugc/v2/restaurants/' + this.shopId + '/ratings/tags', method: 'get'}).then(
          (res) => {
            this.ratingTagsList = res;
          });
      },
      // 获取评论列表
      getRatingList () {
        let params = this.setStrOfUrl({
          has_content: true,
          offset: this.ratingOffset,
          limit: 10,
          tag_name: ''
        });
        this.https({url: '/ugc/v2/restaurants/' + this.shopId + '/ratings', method: 'get'}).then(
          (res) => {
            this.ratingList = res;
          });
      },
      //点击左侧食品列表标题，相应列表移动到最顶层
      chooseMenu (index) {
        this.menuIndex = index;
        //menuIndexChange解决运动时listenScroll依然监听的bug
        this.menuIndexChange = false;
        this.foodScroll.scrollTo(0, -this.shopListTop[index], 400);
        this.foodScroll.on('scrollEnd', () => {
          this.menuIndexChange = true;
        })
      },
      // 更改标签
      changeTag (index, name) {
        this.ratingTageIndex = index;
        this.ratingTagName = name;
        this.ratingOffset = 0;
        this.getRatingList();
      },
      // 获取更多评价
      loaderMoreRating () {},
      //获取食品列表的高度，存入shopListTop
      getFoodListHeight () {
        const listContainer = this.$refs.menuFoodList;
        const listArr = Array.from(listContainer.children[0].children);
        listArr.forEach((item, index) => {
          this.shopListTop.push(item.offsetTop);
        });
        this.listenScroll(listContainer);
      },
      //当滑动食品列表时，监听其scrollTop值来设置对应的食品列表标题的样式
      listenScroll (element) {
        this.foodScroll = new BScroll(element, {
          probeType: 3,
          bounce: false,
          click: true
        });
        const wrapperMenu = new BScroll('#wrapper-menu', {
          click: true
        });
        const wrapMenuHeight = this.$refs.wrapperMenu.clientHeight;
        this.foodScroll.on('scroll', (pos) => {
          if (!this.$refs.wrapperMenu) {
            return;
          }
          this.shopListTop.forEach((item, index) => {
            if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
              this.menuIndex = index;
              const menuList = this.$refs.wrapperMenu.querySelectorAll('.activity-menu');
              const el = menuList[0];
              wrapperMenu.scrollToElement(el, 800, 0);
            }
          })
        })
      },
      toggleCartList () {}
    },
    mounted () {
      this.shopId = this.$route.query.id;
      this.getShopDetail();
      this.getMenuList();
      this.getShopRating();
      this.getShopRatingTag();
      this.getRatingList();
    },
    watch: {},
    destroyed () {
      this.foodScroll && this.foodScroll.destroy();
    }
  };
</script>
<style lang="less" scoped>
  @import (reference) "../assets/style/dynamic";
  .shop {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
    color: #fff;
    .shop-header {
      background-color: rgba(119,103,137,.43);
      svg {
        box-sizing: border-box;
      }
      .arrow-left {
        margin-left: .4rem;
        flex: 0 0 33.333%;
        height: .8rem;
      }
    }
    .shop-info-bg {
      position: absolute;
      width: 100%;
      height: 20%;
      z-index: 9;
      filter: blur(10px);
    }
    .shop-info {
      display: flex;
      align-items: center;
      padding: .4rem;
      margin-top: 1.95rem;
      z-index: 10;
      background-color: rgba(119,103,137,.43);
      .shop-info-left {
        margin-right: .3rem;
        img {
          width: 2.9rem;
          height: 2.9rem;
        }
      }
      .shop-info-right {
        flex: 60%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .shop-info-right-text {
          & > div {
            color: #fff;
          }
          .shop-name {
            font-size: .8rem;
            font-weight: 700;
          }
          .shop-desc {
            font-size: .5rem;
            margin: .3rem 0;
          }
          .shop-promotion {
            font-size: .5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .tabs-title {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 2rem;
      background-color: #fff;
      z-index: 10;
      span {
        padding-bottom: .2rem;
        text-align: center;
        font-size: .65rem;
        color: @fontColor;
      }
      .selected {
        border-bottom: .025rem solid #3190e8;
        color: @blue;
      }
    }
    .shop-food-wrap {
      flex: 1;
      display: flex;
      position: relative;
      margin-bottom: 2rem;
      border-top: .025rem solid @gray;
      overflow-y: auto;
      z-index: 10;
      .food-menu {
        width: 3.8rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        box-shadow: .005rem 0 .025rem @gray;
        .menu-list-item {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 1.5rem .3rem;
          border-bottom: .025rem solid @gray;
          box-sizing: border-box;
          text-align: left;
          span {
            font-size: .6rem;
            font-weight: 500;
            color: @fontColor1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .activity-menu {
          border-left: 0.15rem solid @blue;
          background-color: #fff;
          span:nth-of-type(1){
            font-weight: bold;
          }
        }
      }
      .food-list {
        flex: 70%;
        .food-item-header {
          display: flex;
          align-items: center;
          padding: .4rem;
          .name {
            font-size: .7rem;
            color: @fontColor;
            font-weight: 700;
            margin-right: .4rem;
          }
          .description {
            font-size: .5rem;
            color: @fontColor2;
            overflow: hidden;
          }
        }
        .food-item-info {
          position: relative;
          padding: .6rem .4rem;
          border-bottom: .025rem solid @gray;
          overflow: hidden;
          .food-item-info-top {
            display: flex;
            align-items: flex-start;
            .food-img {
              width: 2rem;
              height: 2rem;
              margin-right: .4rem;
            }
            .food-desc {
              & > div {
                padding: .1rem 0;
              }
              .food-desc-name {
                display: flex;
                align-items: center;
                .food-name {
                  font-size: .7rem;
                  color: @fontColor;
                }
                .attributes-list {
                  display: flex;
                  align-items: center;
                  li {
                    display: flex;
                    align-items: center;
                    height: .6rem;
                    padding: .1rem;
                    border: .025rem solid @fontColor1;
                    border-radius: .3rem;
                    margin-right: .1rem;
                    line-height: .35rem;
                    transform: scale(.8);
                    font-size: .3rem;
                    span {
                      color: @fontColor4;
                    }
                  }
                  .attribute-new {
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: flex;
                    align-items: flex-end;
                    width: 2rem;
                    height: 2rem;
                    border: none;
                    border-radius: 0;
                    background-color: #4cd964;
                    transform: rotate(-45deg) translate(-.1rem,-1.5rem);
                    span {
                      flex: 1;
                      font-size: .4rem;
                      text-align: center;
                    }
                  }
                }
              }
              .food-desc-content {
                font-size: .5rem;
                color: @fontColor2;
              }
              .food-desc-rating {
                display: flex;
                align-items: center;
                span {
                  margin-right: .2rem;
                  font-size: .5rem;
                  color: @fontColor;
                }
              }
              .food-desc-activity {
                display: flex;
                align-items: center;
                span {
                  padding: .08rem;
                  font-size: .3rem;
                  border: .025rem solid currentColor;
                  border-radius: .3rem;
                }
              }

            }
          }
          .food-item-info-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-left: 2.4rem;
            .food-price {
              display: flex;
              align-items: center;
              & > span {
                padding: 0 .1rem;
              }
              .price-icon, .price-num {
                color: @fontColor4;
              }
              .price-icon {
                font-size: .5rem;
              }
              .price-num {
                font-size: .7rem;
                font-weight: 700;
              }
              .price-special {
                font-size: .5rem;
                color: @fontColor1;
              }
            }
          }
        }
      }
      .buy-cart-container {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 2rem;
        display: flex;
        z-index: 13;
        background-color: #3d3d3f;
        .cart-icon-num {
          flex: 1;
          display: flex;
          align-items: center;
          .cart-icon-container {
            margin-top: -.7rem;
            margin-left: .5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1.5rem;
            height: 1.5rem;
            padding: .4rem;
            border: .18rem solid #444;
            border-radius: 50%;
            background-color: #3190e8;
            .cart-icon {
              width: 1.2rem;
              height: 1.2rem;
            }
          }
          .cart-num {
            margin-left: .4rem;
            p {
              font-size: .8rem;
              font-weight: 700;
              color: #fff;
            }
            & > p:last-of-type {
              font-size: .4rem;
            }
          }
        }
        .gotopay {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 5rem;
          height: 100%;
          background-color: #4cd964;
          .gotopay-text {
            font-size: .7rem;
            font-weight: 700;
            color: #fff;
          }
        }
      }
    }
    .shop-rating-wrap {
      flex: 1;
      overflow: auto;
      border-top: .025rem solid @gray;
      .shop-rating-header {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: .8rem .5rem;
        border-bottom: .5rem solid @gray;
        .header-left {
          text-align: center;
          .shop-rating-num {
            font-size: 1.2rem;
            color: @fontColor4;
          }
          .shop-rating-text {
            margin: .2rem 0;
            font-size: .65rem;
            color: @fontColor1;
          }
          .shop-rating-compa {
            font-size: .4rem;
            color: @fontColor2;
          }
        }
        .header-right {
          .header-right-title {
            font-size: .65rem;
            color: @fontColor1;
          }
          .rating-num {
            width: 3rem;
            font-size: .55rem;
            color: @fontColor4;
          }
          .delivery-time {
            font-size: .4rem;
            color: @fontColor2;
          }
        }
      }
      .shop-rating-content {
        .rating-tag-list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          border-bottom: .025rem solid @gray;
          li {
            padding: .3rem;
            margin: .3rem;
            border-radius: .2rem;
            background-color: #ebf5ff;
            font-size: .6rem;
            color: @fontColor1;
          }
          .unsatisfied{
            background-color: @backColor;
            color: #999;
          }
          .tag-activity{
            background-color: @blue;
            color: #fff;
          }
        }
        .user-rating-list {
          .rating-item {
            display: flex;
            align-items: flex-start;
            padding: .6rem .4rem;
            border-bottom: .025rem solid @gray;
            .user-avatar {
              width: 1.5rem;
              height: 1.5rem;
              margin-right: .8rem;
              border: .025rem;
              border-radius: 50%;
            }
            .rating-info {
              flex: 80%;
              .rating-info-top {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                .rating-info-top-left {
                  .user-name {
                    font-size: .55rem;
                    color: @fontColor1;
                  }
                  .rating-star {
                    display: flex;
                    align-items: center;
                    .rating-star-text {
                      margin-left: .2rem;
                      font-size: .55rem;
                      color: @fontColor1;
                    }
                  }
                }
                .rating-info-top-right {
                  font-size: .4rem;
                  color: @fontColor2;
                }
              }
              .rating-info-middle {
                padding: .4rem 0;
                .food-img-list {
                  display: flex;
                  flex-wrap: wrap;
                  align-items: center;
                  img {
                    width: 3rem;
                    height: 3rem;
                    margin-right: .4rem;
                  }
                }
              }
              .rating-info-bottom {
                .food-name-list {
                  display: flex;
                  flex-wrap: wrap;
                  align-items: center;
                  .food-name-item {
                    width: 2.2rem;
                    padding: .2rem;
                    margin-right: .2rem;
                    border: .025rem solid @gray;
                    border-radius: .15rem;
                    font-size: .55rem;
                    color: @fontColor2;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
