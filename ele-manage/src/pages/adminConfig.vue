<template>
  <div class="main-right-content-wrap">
    <Card
      class="card"
      bordered
      shadow>
      <div class="title-wrap" slot="title">
        <span class="title">管理员信息</span>
      </div>
      <div class="content">
        <div class="content-row">
          <span class="name">姓名：</span>
          <span class="value">{{ adminInfo.user_name }}</span>
        </div>
        <div class="content-row">
          <span class="name">注册时间：</span>
          <span class="value">{{ adminInfo.create_time }}</span>
        </div>
        <div class="content-row">
          <span class="name">权限：</span>
          <span class="value">{{ adminInfo.admin }}</span>
        </div>
        <div class="content-row">
          <span class="name">ID：</span>
          <span class="value">{{ adminInfo.id }}</span>
        </div>
        <div class="content-row">
          <span class="name">头像：</span>
          <Upload
            :action="baseUrl + '/admin/update/avatar/' + adminInfo.id"
            :max-size="2000"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :show-upload-list="false"
            type="drag"
            accept="image/*"
            :style="{display: 'inline-block'}">
            <img-show-wrap :imgSrc=" baseImgPath + adminInfo.avatar"></img-show-wrap>
          </Upload>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex';
  import { baseUrl, baseImgPath } from '../../config/env';
  export default {
        components: {},
        computed: {
          ...mapState(['adminInfo'])
        },
        data () {
            return {
              baseUrl,
              baseImgPath
            };
        },
        methods: {
          ...mapMutations(['saveAdminInfo']),
          getAdminInfo () {
            this.https({url: '/admin/info', method: 'get'}, (response) => {
              if (response.status === 1) {
                this.saveAdminInfo(response.data);
              }
            });
          },
          // 文件上传相关方法
          fileUploadSuccess (response) {
            this.adminInfo.avatar = response.image_path;
          },
          fileUploadError (error) {
            this.$Message.error(error);
          }
        },
        mounted () {
          this.getAdminInfo();
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
    .card {
      width: 100%;
      height: 100%;
      .title-wrap {
        text-align: center;
        .title {
          font-size: 1.5em;
          font-weight: 900;
        }
      }
      .content {
        width: 50%;
        margin: 0 auto;
        background-color: #EFF2F7;
        .content-row {
          display: flex;
          justify-content: center;
          width: 400px;
          margin: auto;
          padding: 10px 0;
          font-size: 1.2em;
          span {
            display: inline-block;
          }
          .name {
            width: 200px;
            text-align: left;
            font-weight: 700;
          }
          .value {
            width: 200px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
