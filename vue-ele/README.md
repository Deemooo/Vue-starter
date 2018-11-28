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
  vue-ele
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
      |   ├─env.js               # 地址配置
      │   ├─index.js             # 保存设置开发环境和生成环境相关配置 配置入口
      │   └─prod.env.js          # 设置生产环境变量
      │
      ├─node_modules             # npm依赖包
      │
      │
      ├─src                      # 项目的src路径
      │  ├─assets                # 静态资源文件 （存放公用样式，主题更改文件）
      │  ├─components            # 公用组件
      │  ├─pageConfig            # 页面配置文件 （错误编码配置，socket配置，i18n）
      │  ├─pages                 # 页面文件
      │  ├─router                # 路由配置文件
      │  ├─store                 # 全局vuex
      │  ├─public                # 工具类方法
      │  ├─App.vue               # 单页应用入口文件
      │  └─main.js               # 入口js文件
      │
      ├─static                   # 存放静态资源文件（目前用来存放图片）
      │
      ├─.babelrc                 # es6转化为es5的配置
      ├─.editorconfig            # 编辑器配置
      ├─.eslintignore            # 代码规范eslint监测文件
      ├─.eslintrc.js             # eslint配置
      ├─.gitignore               # git提交忽略文件
      ├─.postcssrc.js            # postcss-loader包的一个配置
      ├─index.html               # 项目入口文件
      ├─package.json             # 各种配置文件管理
      └─README.md                # 项目注释
```
