## 安装：
npm install

## 运行：
npm run dev

## 发布：
npm run build

## 地址:
http://localhost:8080

## 目录结构
  ```html
  ele-manage
      ├─build                     # 编译配置
      │   ├─build.js              # 构建环境下的配置
      │   ├─check-versions.js     # 检查npm和node版本是否对应
      │   ├─utils.js              # 工具函数，为打包提供依赖
      │   ├─vue-loader.conf.js    # 处理解析.vue文件
      │   ├─webpack.base.conf.js  # 开发和生产环境公共配置
      │   ├─webpack.dev.conf.js   # 开发环境相关配置（插件引入，样式处理规则，环境配置，错误信息输出）
      │   └─webpack.prod.conf.js  # 构建项目用到的webpack配置来自这里，完善webpack.base.conf.js 配置
      │
      ├─config                   # 区分开发环境和生产环境，保存相关配置
      │   ├─dev.env.js           # 设置开发环境变量
      │   ├─index.js             # 保存设置开发环境和生成环境相关配置 配置入口
      │   └─prod.env.js          # 设置生产环境变量
      │
      ├─node_modules             # npm依赖包
      │
      │
      ├─src                      # 项目的src路径
      │  ├─assets                # 静态资源文件 （存放公用样式，主题更改文件）
      │  ├─components            # 公用组件
      │  ├─pages                 # 页面文件
      │  ├─router                # 路由配置文件
      │  ├─store                 # 全局vuex
      │  ├─publicFn              # 公共方法 （fetch，mixins）
      │  ├─App.vue               # 单页应用入口文件
      │  └─main.js               # 入口js文件
      │
      ├─static                   # 存放静态资源文件
      │
      ├─.babelrc                 # es6转化为es5的配置
      ├─.editorconfig            # 编辑器配置
      ├─.eslintignore            # 代码规范eslint监测文件
      ├─.eslintrc.js             # eslint配置
      ├─.gitignore               # git提交忽略文件
      ├─.postcssrc.js            # postcss-loader包的一个配置
      ├─index.html               # 项目入口文件
      ├─package.json             # 各种配置文件管理 npm 会根据这个下载配置和依赖
      ├─package-lock.json        # 当前依赖包版本
      └─README.md                # 项目注释
  ```

## 技术栈
    * vue.js
    * vue-router
    * vuex
    * ES6
    * iview
## 项目截图
<img src="https://github.com/Deemooo/Vue-starter/blob/master/screenshots/ele-manage1.gif"/>
<img src="https://github.com/Deemooo/Vue-starter/blob/master/screenshots/ele-manage2.gif"/>
