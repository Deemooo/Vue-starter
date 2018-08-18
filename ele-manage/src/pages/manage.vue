<template>
  <div class="main-wrap">
    <top-header></top-header>
    <Row class="main-wrap-content">
      <Col span="4" class="menu-wrap">
        <Menu width="auto" theme="dark">
          <Submenu v-for="(item, index) in menus" :name="item.name" :key="index">
            <template slot="title">
              <Icon :type="item.icon" />
              {{item.title}}
            </template>
            <MenuItem
              v-for="(childItem, childIndex) in item.children"
              :name="childItem.name" :key="childIndex"
              :to="childItem.name"
            >
              <Icon :type="childItem.icon" />
              {{ childItem.title}}
            </MenuItem>
          </Submenu>
        </Menu>
      </Col>
      <Col span="20" class="right-content-wrap">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </Col>
    </Row>
  </div>
</template>

<script>
    export default {
      components: {},
      data () {
        return {
          menus: [
            {
              title: '数据管理',
              icon: 'ios-paper',
              name: 'dataManage',
              path: '/dataManage',
              children: [
                {
                  title: '用户列表',
                  icon: 'ios-people',
                  name: 'usersList',
                  path: '/usersList'
                },
                {
                  title: '商家列表',
                  icon: 'md-home',
                  name: 'shopList',
                  path: '/shopList'
                },
                {
                  title: '食品列表',
                  icon: 'md-beer',
                  name: 'foodList',
                  path: '/foodList'
                },
                {
                  title: '订单列表',
                  icon: 'md-send',
                  name: 'orderList',
                  path: '/orderList'
                },
                {
                  title: '管理员列表',
                  icon: 'md-people',
                  name: 'adminList',
                  path: '/adminList'
                }
              ]
            },
            {
              title: '添加数据',
              icon: 'md-add-circle',
              name: 'addData',
              path: '/addData',
              children: [
                {
                  title: '添加商铺',
                  icon: 'md-home',
                  name: 'addShop',
                  path: '/addShop'
                },
                {
                  title: '添加商品',
                  icon: 'md-beer',
                  name: 'addGoods',
                  path: '/addGoods'
                }
              ]
            },
            {
              title: '图表',
              icon: 'ios-paper',
              name: 'ios-stats',
              path: '/chartInfo',
              children: [
                {
                  title: '用户分布',
                  icon: 'ios-navigate',
                  name: 'visitor',
                  path: '/visitor'
                }
              ]
            },
            {
              title: '编辑',
              icon: 'ios-paper',
              name: 'editManage',
              path: '/editManage',
              children: [
                {
                  title: '文本编辑',
                  icon: 'ios-document',
                  name: 'textEdit',
                  path: '/textEdit'
                }
              ]
            },
            {
              title: '设置',
              icon: 'md-settings',
              name: 'config',
              path: '/config',
              children: [
                {
                  title: '管理员设置',
                  icon: 'md-people',
                  name: 'adminConfig',
                  path: '/adminConfig'
                }
              ]
            },
            {
              title: '说明',
              icon: 'md-alert',
              name: 'about',
              path: '/about',
              children: [
                {
                  title: '说明',
                  icon: 'md-document',
                  name: 'explain',
                  path: '/explain'
                }
              ]
            }
          ]
        };
      }
    };
</script>

<style lang="less" scoped>
  .main-wrap {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    .main-wrap-content {
      width: 100%;
      height: calc(~'100% - 60px');
      .menu-wrap {
        height: 100%;
        min-height: 600px;
        overflow: auto;
        background-color: #515a6e;
      }
      .right-content-wrap {
        height: 100%;
        min-height: 600px;
        overflow-y: auto;
        box-sizing: border-box;
        padding: 5px;
        box-shadow: 1px 1px 1px #515a6e;
      }
    }
  }
</style>
