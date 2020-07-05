<template>
  <div class="loading">
    <img src="/imgs/loading.gif" alt="" />
  </div>
</template>
<script>
export default {
  name: "loading"
};
</script>
<style lang="scss">
.loading {
  height: 7rem;
  line-height: 7rem;
  text-align: center;
  padding: 3rem 0;
  img {
    height: 100%;
  }
}
</style>
