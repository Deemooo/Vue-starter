<!--购物车-->
<template>
  <div class="buy-cart">
    <div class="cart-button" >
      <svg v-show="foodNum" @click="reduceFromCart" class="reduce-icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
      </svg>
      <span class="food-num" v-show="foodNum">{{foodNum}}</span>
      <svg class="add-icon" @click="addToCart">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
      </svg>
    </div>
  </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    props: ['foods', 'shopId'],
    components: {},
    computed: {
      ...mapState([
        'CARTLIST'
      ]),
      foodNum () {
        let itemId = this.foods.item_id;
        if (this.CARTLIST[itemId]) {
          return this.CARTLIST[itemId].num || 0;
        } else {
          return 0;
        }
      }
    },
    data () {
      return {
      };
    },
    methods: {
      // 购物车新增
      addToCart () {
        this.$emit('addToCart');
      },
      // 购物车移除
      reduceFromCart () {
        if (this.foodNum > 0) {
          this.$emit('reduceFromCart');
        }
      }
    },
    mounted () {
    },
    watch: {
    }
  };
</script>
<style lang="less" scoped>
  @import (reference) "../assets/style/dynamic";
  .buy-cart {
    .cart-button {
      display: flex;
      align-items: center;
      & > svg {
        width: .9rem;
        height: .9rem;
        fill: @blue;
      }
      .food-num {
        padding: 0 .2rem;
        line-height: .9rem;
        font-size: .65rem;
        color: @fontColor1;
        text-align: center;
        font-family: Helvetica Neue,Tahoma;
      }
    }
  }
</style>
