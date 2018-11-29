<template>
  <div class="buy-cart">
    <div class="cart-button" >
      <svg v-if="foodNum" class="reduce-icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
      </svg>
      <span class="food-num" v-if="foodNum">{{foodNum}}</span>
      <svg class="add-icon" @click="addToCart">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
      </svg>
    </div>
  </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    props: ['itemId', 'shopId'],
    components: {},
    computed: {
      ...mapState([
        'CARTLIST'
      ])
    },
    data () {
      return {
        foodNum: 0
      };
    },
    methods: {
      addToCart () {
        this.$emit('addToCart');
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
