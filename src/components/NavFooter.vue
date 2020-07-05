<template>
  <div class="footer">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24">
        <div class="footer-logo"></div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24">
        <div class="footer-link">
          <a href="https://www.weibo.com/ULSUM?is_all=1#_rnd1591755212197"
            >关于我们</a
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "nav-footer"
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/base.scss";
@import "./../assets/scss/mixin.scss";
.footer {
  text-align: center;
  .footer-logo {
    @include bgImg(128px, 55px, "/imgs/headerlogo.jpg");
  }
}
</style>
