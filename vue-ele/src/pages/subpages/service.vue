<template>
    <div class="service">
      <top-header>
        <template>
          <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" version="1.1" @click="$router.go(-1)">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
          <span class="service-title">会员中心</span>
        </template>
      </top-header>
      <div class="service-way">
        <a href="https://ecs-im.ele.me/" class="service-way-item">
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#human"></use>
          </svg>
          <span>在线客服</span>
        </a>
        <a href="tel:10105757" class="service-way-item">
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#phone"></use>
          </svg>
          <span>电话客服</span>
        </a>
      </div>
      <div class="service-hot-questions">
        <div class="hot-questions-title">热门问题</div>
        <div class="hot-questions-list">
          <div v-for="(item, index) in questionTitleList" :key="index" @click="getQuestionDetail(item, index)" class="hot-questions-item">
            <span>{{ item }}</span>
            <svg class="arrow-svg" fill="#999">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import { mapMutations } from 'vuex';
  export default {
      components: {},
      computed: {},
      data () {
          return {
            questionTitleList: [],
            questionDetail: []
          };
      },
      methods: {
        ...mapMutations([
          'SAVEQUESTIONS'
        ]),
        // 获取问题标题
        getService () {
          this.https({url: '/v3/profile/explain', method: 'get'}).then(
            (res) => {
              let resArr = Object.keys(res);
              resArr.forEach(item => {
                if (item.indexOf('Caption') !== -1) {
                  this.questionTitleList.push(res[item]);
                } else {
                  this.questionDetail.push(res[item]);
                }
              });
              this.questionTitleList = this.questionTitleList.filter((item, index, arr) => {
                return  arr.indexOf(item) === index;
              });
            });
        },
        // 获取问题详情
        getQuestionDetail (title, index) {
          this.SAVEQUESTIONS({title, detail: this.questionDetail[index]});
          this.$router.push('questionDetail');
        }
      },
      mounted () {
        this.getService();
      },
      watch: {}
  };
</script>
<style lang="less" scoped>
  @import (reference) "../../assets/style/dynamic";
  .service {
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
    .service-title {
      flex: 0 0 33.333%;
      font-size: .8rem;
      line-height: .8rem;
      text-align: center;
      font-weight: 700;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .service-way {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.95rem;
      border-bottom: .025rem solid @gray;
      .service-way-item {
        flex: 0 0 50%;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 4rem;
        svg {
          width: 1rem;
          height: 1rem;
        }
        span {
          margin-top: .4rem;
          font-size: .6rem;
          color: @fontColor1;
        }
      }
      .service-way-item:first-child {
        border-right: .025rem solid @gray;
      }
    }
    .service-hot-questions {
      .hot-questions-title {
        padding-left: .8rem;
        border-bottom: .025rem solid @gray;
        font-size: .75rem;
        color: @fontColor;
        line-height: 3rem;
      }
      .hot-questions-list {
        .hot-questions-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 .8rem;
          border-bottom: .025rem solid @gray;
          line-height: 2rem;
          span {
            font-size: .6rem;
            color: @fontColor1;
          }
          svg {
            width: .6rem;
            height: .6rem;
          }
        }
      }
    }
  }
</style>
