<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="">五双</a>
          <a href="">纪录片</a>
          <a href="">第一眼</a>
          <a href="">人物</a>
          <a href="">壁纸</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{ username }}</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <a href="/#/order/list" v-if="username">我的订单</a>
          <a href="">注册</a>
          <a href="javascript:;" class="my-cart" @click="goToCart">
            <span class="icon-cart"></span>购物车({{ cartCount }})
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header" :class="{ is_fixed: isFixed }">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>卫衣</span>
            <div class="children">
              <ul class="proFather">
                <li class="product">
                  <a href="">
                    <div class="pro-img">
                      <img src="/imgs/weiyi-hei.jpg" alt="" class="" />
                    </div>
                    <div class="pro-name">ulsum 2.0</div>
                  </a>
                </li>
                <li class="product">
                  <a href="">
                    <div class="pro-img">
                      <img src="/imgs/weiyi-hei.jpg" alt="" class="" />
                    </div>
                    <div class="pro-name">ulsum 2.0</div>
                  </a>
                </li>
                <li class="product">
                  <a href="">
                    <div class="pro-img">
                      <img src="/imgs/weiyi-hei.jpg" alt="" class="" />
                    </div>
                    <div class="pro-name">ulsum 2.0</div>
                  </a>
                </li>
                <li class="product">
                  <a href="">
                    <div class="pro-img">
                      <img src="/imgs/weiyi-hei.jpg" alt="" class="" />
                    </div>
                    <div class="pro-name">ulsum 2.0</div>
                  </a>
                </li>
                <li class="product">
                  <a href="">
                    <div class="pro-img">
                      <img src="/imgs/weiyi-hei.jpg" alt="" class="" />
                    </div>
                    <div class="pro-name">ulsum 2.0</div>
                  </a>
                </li>
                <li class="product">
                  <a href="">
                    <div class="pro-img">
                      <img src="/imgs/weiyi-hei.jpg" alt="" class="" />
                    </div>
                    <div class="pro-name">ulsum 2.0</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>短袖</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>袜子</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>椅子</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>箱子</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>手机</span>
            <div class="children">
              <ul class="proFather">
                <li
                  class="product"
                  v-for="(item, index) in phoneList"
                  :key="index"
                >
                  <a v-bind:href="'/#/product/' + item.id" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" />
                    </div>
                  </a>
                  <div class="pro-name" @click="addCart(item.id)">
                    {{ item.name }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="search"
            class="search"
          >
          </el-input>
        </div>
      </div>
    </div>
    <modal
      title="提示"
      sureText="查看购物车"
      btnType="1"
      modalType="middle"
      :showModal="showModal"
      @submit="goToCart"
      @cancel="showModal = false"
    >
      <template v-slot:content>
        <p>商品已添加到购物车</p>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Modal from "./../components/Modal";
export default {
  name: "nav-header",
  components: {
    Modal
  },
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
    if (params && (params.from == "login" || params.from == "order")) {
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
      this.isFixed = scrollTop > 50 ? true : false;
    }
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/base.scss";
@import "./../assets/scss/mixin.scss";

.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: $colorB;
    color: $colorG;
    .container {
      @include flex();
      a {
        display: inline-block;
        color: $colorG;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        background-color: $colorB;
        text-align: center;
        .icon-cart {
          @include bgImg(16px, 12px, "/imgs/icon-cart-checked.png");
          margin-right: 4px;
        }
      }
    }
  }
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
      .header-menu {
        flex: 2;
        display: inline-block;
        height: 75px;
        width: 643px;
        text-align: center;
        .item-menu {
          display: inline-block;
          font-weight: bold;
          height: 75px;
          font-size: 16px;
          line-height: 75px;
          margin-right: 20px;
          margin-left: 20px;
          span {
            cursor: pointer;
          }
          &:hover {
            border-bottom-style: solid;
            border-width: 2px;
            .children {
              height: 200px;
              opacity: 1;
              background: $colorG;
            }
          }
          .children {
            position: absolute;
            top: 75px;
            left: 0;
            right: 0;
            height: 0;
            opacity: 0;
            overflow: hidden;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 10;
            transition: all 0.5s;
            .proFather {
              max-width: 1024px;
              margin: 0 auto;
              .product {
                position: relative;
                float: left;
                width: 16.6%;
                height: 200px;
                font-size: 12px;
                line-height: 12px;
                text-align: center;
                a {
                  display: inline-block;
                }
                img {
                  width: auto;
                  height: 111px;
                  margin-top: 26px;
                }
                .pro-img {
                  height: 150px;
                }
                .pro-name {
                  font-weight: bold;
                  margin-top: 19px;
                  margin-bottom: 8px;
                  color: $colorB;
                  &:after {
                    @include bgImg(22px, 22px, "/imgs/icon-cart.png");
                    content: " ";
                    margin-left: 5px;
                    vertical-align: middle;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }
      .header-search {
        flex: 1;
        .search {
          .el-input__inner {
            &:focus-within {
              border-color: #000000;
            }
          }
        }
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
</style>
