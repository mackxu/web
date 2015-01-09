# 2014/12 前端交接内容

## 关于Grunt
安装: nodejs和grunt-cli
部署命令：npm install
功能：**编译Less文件为Public/css/nuandao.css文件、监听Less文件改动**
命令行：grunt **手动**编译less 。 grunt watch **实时监听less并改动编译成最新的css**   
Less语法规范：[http://www.lesscss.net/](http://www.lesscss.net/)

## less 文件
可以在css中复用样式，提高开发效率

    main.less 引入less的入口
    variables.less  所有变量
    mixins.less 定义所有函数

    normalize.less  reset文件
    scaffolding.less  公共的样式 包含模块样式
    grid.less  布局样式

    // 页面样式
    module.less  模块样式
    index.less 定义首页
    list.less 列表页 品牌页 专题页
    product.less  详情页
    cart.less 购物车三大步
    owner.less 用户中心
    public.less 登陆，注册，404 等页面

注意: 

- 网站采用盒模型是**border-box** 目前兼容IE7+、主流浏览器、手机及平板。
- 响应式网站适配宽度 1240、988、736、720

## 模板文件
文件位置: Nuandao/Tpl/Home/default

## JS文件
文件位置: **Public/scripts/**
- index/index.js 首页JS
- module/
- plugins/ 网站引入的是压缩文件、如果要修改可以通过未压缩文件重新生成压缩文件
- public/ poplogin.js、public-new.js
- cart/和list/ 是没使用的文件
- 其他: Public/js 里面的js不需要前端维护，但也不要删除

---
## 上线注意事项
- 静态文件上线前，需要更新其版本号，更改位置: Nuandao/Lib/Action/BaseAction.class.php 大约100行处。版本号可以设置为hg的当前所在的变更集(hg sum)、也可以为原来的数字上加1的值
- HG使用 https://trello.com/c/NYB9dFoU/518-hg
- 上线流程 https://trello.com/c/qDrNKfKJ/868-- 

