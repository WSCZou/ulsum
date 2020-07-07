<template>
  <div class="header">
    <div class="nav-header" :class="{ is_fixed: isFixed }">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index" @click="gotoIndex"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "order-header",
  components: {},
  data() {
    return {
      search: "",
      phoneList: [],
      showModal: false,
      isFixed: false
    };
  },
  computed: {
    ...mapState(["username", "cartCount"])
  },
  mounted() {
    this.getProductList();
    let params = this.$route.params;
    if (params && params.from == "login") {
      this.getCartCount();
    }
    window.addEventListener("scroll", this.initHeight);
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    getProductList() {
      console.log(1);
      this.axios
        .get("/products", {
          params: {
            categoryId: "100012",
            pageSize: 6
          }
        })
        .then(res => {
          this.phoneList = res.list;
        });
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then((res = 0) => {
        this.$store.dispatch("saveCartCount", res);
      });
    },
    logout() {
      this.axios.post("/user/logout").then(() => {
        this.$message.success("退出成功");
        this.$cookie.set("userId", "", { expires: "-1" });
        this.$store.dispatch("saveUserName", "");
        this.$store.dispatch("saveCartCount", "0");
      });
    },
    goToCart() {
      this.$router.push("/cart");
      this.showModal = false;
    },
    addCart(id) {
      this.axios
        .post("/carts", {
          productId: id,
          selected: true
        })
        .then(res => {
          this.showModal = true;
          this.$store.dispatch("saveCartCount", res.cartTotalQuantity);
        });
    },
    initHeight() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = scrollTop > 152 ? true : false;
    },
    gotoIndex() {
      this.$router.push({
        name: "index",
        params: {
          from: "order"
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/base.scss";
@import "./../assets/scss/mixin.scss";
.header {
  .nav-header {
    .container {
      @include flex();
      height: 75px;
      box-shadow: inset 0 -1px 0 0 #e5e5e5;
      .header-logo {
        flex: 1;
        display: inline-block;
        width: 128px;
        height: 55px;
        padding: 10px 0px;
        a {
          @include bgImg(128px, 55px, "/imgs/headerlogo.jpg");
        }
      }
      &.is_fixed {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 10;
        background-color: $colorG;
      }
    }
  }
}
</style>
