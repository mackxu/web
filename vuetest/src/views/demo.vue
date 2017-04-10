<style lang="css" scoped>
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
.wrapper-header {
  height: 200px;
  background-color: #eee;
  padding-left: 100px;
}
.aside {  margin-bottom: 20px; }
.list li{
  display: inline-block;
  height: 80px;
  width: 200px;
  background-color: #009688;
  margin-right: 20px;
}
.row { margin-bottom: 20px; width: 9999px; }
.row li { height: 200px; }
.wrapper-main {
  height: 600px;
  overflow: hidden;
  background-color: #888;
  padding: 20px;
}
</style>
<template>
<div class="wrapper" v-scope.group data-focus-name="group-home">
	<div class="wrapper-header">
   <ul class="aside list">
     <li><a href="">搜索</a></li>
     <li><a href="">我的</a></li>
     <li><a href="">消息</a></li>
   </ul>
   <div class="bside"></div>
   <div class="tab-container">
      <ul class="aside list">
       <li><a href="">首页</a></li>
       <li><a href="">vip会员</a></li>
       <li><a href="">电视剧</a></li>
     </ul>
   </div> 
  </div>
  <div class="wrapper-main">
    <div class="tab-home">
      <ul class="row list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
      <ul class="row list">
        <li>I</li>
        <li>II</li>
        <li>III</li>
        <li>IV</li>
        <li>V</li>
      </ul>
      <ul class="row list">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>