<template>
  <div class="cart">
    <div class="container">
      <div class="cart-name">购物车</div>
      <div class="allChecked">
        <el-checkbox class="checkbox" v-model="allChecked" @change="toggleAll"
          >全选
        </el-checkbox>
      </div>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="16">
          <ul class="cart-item-list">
            <li
              class="cart-item"
              v-for="(item, index) in list"
              v-bind:key="index"
            >
              <div class="item-check">
                <el-checkbox
                  class="checkbox"
                  v-model="item.productSelected"
                  @change="isCheck(item)"
                ></el-checkbox>
              </div>
              <div class="item-img">
                <img v-lazy="item.productMainImage" alt="" />
              </div>
              <div class="item-detail">
                <div class="item-name">{{ item.productName }}</div>
                <div class="item-subtitle">{{ item.productSubtitle }}</div>
                <div class="item-num">
                  <div class="num-box">
                    <el-input-number
                      size="mini"
                      v-model="item.quantity"
                      @change="updateCart(item, item.quantity)"
                      :min="1"
                      :max="item.productStock"
                    ></el-input-number>
                  </div>
                </div>
                <div class="item-del" @click="delProduct(item)">删除</div>
              </div>
              <div class="item-total">{{ item.productTotalPrice }}</div>
            </li>
          </ul>
        </el-col>
        <el-col :xs="24" :sm="8">
          <div class="cart-summary">
            <el-row :gutter="15">
              <el-col :xs="24" :sm="24"><div class="name">摘要</div></el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :xs="24" :sm="20"><div class="LP">小计</div></el-col>
              <el-col :xs="24" :sm="4">
                <span class="freight-sp">{{ `￥${cartTotalPrice}` }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :xs="24" :sm="20"><div class="freight">运费</div></el-col>
              <el-col :xs="24" :sm="4">
                <span class="freight-sp">￥0.00</span>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :xs="24" :sm="20">
                <div class="totalPrice">总计</div>
              </el-col>
              <el-col :xs="24" :sm="4">
                <span class="freight-sp">{{ `￥${cartTotalPrice}` }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :xs="24" :sm="24">
                <button class="btn btn-huge" @click="order">结算</button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "cart",
  components: {},
  data() {
    return {
      list: [], //商品列表
      allChecked: false, //是否全选
      cartTotalPrice: 0, //商品总金额
      checkedNum: 0, //选中商品数量,
      num: 0 //单件物品数量
    };
  },
  mounted() {
    this.getCartList();
  },
  methods: {
    // 获取购物车列表
    getCartList() {
      this.axios.get("/carts").then(res => {
        this.renderData(res);
      });
    },
    // 更新购物车数量和购物车单选状态
    updateCart(item) {
      let quantity = item.quantity;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        // 异步请求
        this.axios
          .put(`/carts/${item.productId}`, {
            quantity
          })
          .then(res => {
            this.renderData(res);
          });
      }, 500);
    },
    //单个物品选中
    isCheck(item) {
      let selected = item.productSelected;
      //selected = !item.productSelected;
      console.log(selected);
      this.axios
        .put(`/carts/${item.productId}`, {
          selected
        })
        .then(res => {
          this.renderData(res);
        });
    },
    //删除物品
    delProduct(item) {
      let productId = item.productId;
      this.axios
        .delete(`/carts/${item.productId}`, {
          productId
        })
        .then(res => {
          this.renderData(res);
        });
    },
    // 公共赋值
    renderData(res) {
      this.list = res.cartProductVoList || [];
      this.allChecked = res.selectedAll;
      this.cartTotalPrice = res.cartTotalPrice;
      this.checkedNum = this.list.filter(item => item.productSelected).length;
    },
    //全选
    toggleAll() {
      let url = this.allChecked ? "/carts/selectAll" : "/carts/unSelectAll";
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        // 异步请求
        this.axios.put(url).then(res => {
          this.renderData(res);
        });
      }, 300);
    },
    // 购物车下单
    order() {
      let isCheck = this.list.every(item => !item.productSelected);
      if (isCheck) {
        this.$message.warning("请选择一件商品");
      } else {
        this.$router.push("/order/confirm");
      }
    }
  }
};
</script>
<style lang="scss">
.cart {
  .container {
    padding: 0 200px;
    .cart-name {
      margin-top: 50px;
      margin-bottom: 40px;
      font-weight: 500;
      font-size: 22px;
      line-height: 1.5;
      box-shadow: rgb(229, 229, 229) 0px 0px 0px 0px inset,
        rgb(229, 229, 229) 0px 0px 0px 0px inset,
        rgb(229, 229, 229) 0px -1px 0px 0px inset,
        rgb(229, 229, 229) 0px 0px 0px 0px inset;
    }
    .cart-item-list {
      .cart-item {
        display: flex;
        align-items: center;
        height: 125px;
        box-shadow: rgb(229, 229, 229) 0px 0px 0px 0px inset,
          rgb(229, 229, 229) 0px 0px 0px 0px inset,
          rgb(229, 229, 229) 0px -1px 0px 0px inset,
          rgb(229, 229, 229) 0px 0px 0px 0px inset;
        font-size: 16px;
        .item-check {
          flex: 1;
        }
        .item-img {
          flex: 3;
          img {
            width: 10rem;
            vertical-align: middle;
          }
        }
        .item-detail {
          flex: 5;
          .item-name {
            font-size: 18px;
            color: #333333;
            display: block;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .item-subtitle {
            font-size: 14px;
            color: rgb(141, 141, 141);
            display: block;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .item-del {
            padding: 10px 0;
            line-height: 14px;
            cursor: pointer;
          }
        }
        .item-total {
          flex: 1;
        }
      }
    }
    .cart-summary {
      .name {
        font-size: 22px;
        line-height: 1.5;
        font-weight: 500;
        padding-bottom: 8px;
      }
      .LP {
        font-size: 14px;
        line-height: 1.5;
        padding-bottom: 8px;
      }
      .freight {
        font-size: 14px;
        line-height: 1.5;
        padding-bottom: 8px;
      }

      .totalPrice {
        font-size: 14px;
        line-height: 1.5;
        padding-bottom: 8px;
      }
      .btn {
        border: none;
        margin: 10px 20px;
      }
    }
  }
}
</style>
