<template>
  <div class="leftNav">
    <el-menu
      default-active="1"
      background-color="#3e4a60"
      text-color="#fff"
      active-text-color="#ffd04b"
      >
      <el-menu-item index="1">
        <i class="icon iconfont icon-diancan"></i>
        <span slot="title">点餐</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="icon iconfont icon-dianpu"></i>
        <span slot="title">店铺</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="icon iconfont icon-gengduo"></i>
        <span slot="title">更多</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style>
ul,li {
  list-style: none;
}
.leftNav {
  float: left;
  width: 6%;
  height: 100%;
  background: #3e4a60;
  font-size: 14px;
  color: #fff;
  text-align: center;
}
.iconfont {
  font-size: 24px;
}
.leftNav ul {
  padding: 0;
  margin: 0;
}
.leftNav ul li {
  height: 74px;
  line-height: 54px;
  padding: 10px 20px;
  cursor: pointer;
}
.el-menu {
  border-right: none;
}
</style>
