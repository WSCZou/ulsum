<template>
  <div class="orderPay">
    <div class="container">
      <div class="orderInfo">
        <div class="infoHeader">配送</div>
        <div class="infoWrrap">
          <div class="name">{{ addressInfo.receiverName }}</div>
          <div class="phone">{{ addressInfo.receiverMobile }}</div>
          <div class="adress">
            {{
              addressInfo.receiverProvince +
                " " +
                addressInfo.receiverCity +
                " " +
                addressInfo.receiverDistrict
            }}
          </div>
        </div>
      </div>
      <div class="order-total">
        <div class="orderTitle">
          摘要
        </div>
        <div class="priceWrrap">
          <div class="price">总计：{{ payment }}</div>
          <div class="priceDetail">
            订单详情<em
              class="icon-down"
              :class="{ up: showDetail }"
              @click="showDetail = !showDetail"
            ></em>
          </div>
          <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：{{ orderId }}</div>
            </div>
            <div class="item-good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item, index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage" />{{ item.productName }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pay">
        <div class="payHeader">付款</div>
        <div class="payWrrap">
          <div
            class="alipay"
            :class="{ checked: payType == 1 }"
            @click="payType = 1"
          ></div>
          <div
            class="wechatPay"
            :class="{ checked: payType == 2 }"
            @click="payType = 2"
          ></div>
        </div>
      </div>

      <el-row :gutter="5" class="checkButton">
        <el-col :xs="0" :sm="20"><div class="fill"></div></el-col>
        <el-col :xs="24" :sm="4">
          <div class="submitOrder" @click="paySubmit">
            支付
          </div></el-col
        >
      </el-row>
    </div>
    <modal
      v-if="showWechat"
      title="微信支付"
      modalType="middle"
      :showModal="showWechat"
      @cancel="closePayModal"
    >
      <template v-slot:content>
        <img :src="payImg" alt="" class="payQrcode" />
      </template>
    </modal>
    <modal
      title="支付确认"
      btnType="3"
      :showModal="showPayModal"
      sureText="查看订单"
      cancelText="未支付"
      @cancel="showPayModal = false"
      @submit="goOrderList"
    >
      <template v-slot:body>
        <p>您确认是否完成支付？</p>
      </template>
    </modal>
  </div>
</template>

<script>
import QRCode from "qrcode";
import Modal from "./../components/Modal";
export default {
  name: "orderPay",
  components: {
    Modal
  },
  data() {
    return {
      orderId: this.$route.query.orderNo,
      addressInfo: {}, //收货人地址
      orderDetail: [], //订单详情，包含商品列表
      showDetail: false, //是否显示订单详情
      payType: "", //支付类型
      payImg: "", //微信支付的二维码地址
      showPayModal: false, //是否显示二次支付确认弹框
      payment: 0, //订单总金额
      T: "", //定时器ID
      showWechat: false //显示微信支付弹框
    };
  },
  mounted() {
    this.getOrderDetail();
  },
  methods: {
    getOrderDetail() {
      this.axios.get(`/orders/${this.orderId}`).then(res => {
        this.addressInfo = res.shippingVo;
        this.orderDetail = res.orderItemVoList;
        this.payment = res.payment;
      });
    },
    paySubmit() {
      if (this.payType == 1) {
        window.open("/#/order/alipay?orderId=" + this.orderId, "_blank");
      } else if (this.payType == 2) {
        this.axios
          .post("/pay", {
            orderId: this.orderId,
            orderName: "ulsum",
            amount: 0.01, //单位元
            payType: 2 //1支付宝，2微信
          })
          .then(res => {
            QRCode.toDataURL(res.content)
              .then(url => {
                this.payImg = url;
                this.showWechat = true;
                console.log(this.payImg);
                this.loopOrderState();
              })
              .catch(() => {
                this.$message.error("微信二维码生成失败，请稍后重试");
              });
          });
      } else {
        this.$message.error("请选择一种付款方式");
      }
    },
    // 关闭微信弹框
    closePayModal() {
      this.showWechat = false;
      this.showPayModal = true;
      clearInterval(this.T);
    },
    // 轮询当前订单支付状态
    loopOrderState() {
      this.T = setInterval(() => {
        this.axios.get(`/orders/${this.orderId}`).then(res => {
          if (res.status == 20) {
            clearInterval(this.T);
            this.goOrderList();
          }
        });
      }, 1000);
    },
    goOrderList() {
      this.$router.push("/order/list");
    }
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
.orderPay {
  padding: 0 18rem;
  .orderInfo {
    padding-top: 3rem;
    .infoHeader {
      background-color: $colorB;
      color: $colorG;
      height: 3rem;
      line-height: 3rem;
      padding-left: 1rem;
      font-size: 1.5rem;
    }
    .infoWrrap {
      box-shadow: inset 0 1px 0 0 #e5e5e5, inset -1px 0 0 0 #e5e5e5,
        inset 0 -1px 0 0 #e5e5e5, inset 1px 0 0 0 #e5e5e5;
      padding: 2rem;
      .name {
        height: 1.5rem;
        line-height: 1.5rem;
        font-size: 1.2rem;
      }
      .phone {
        height: 1.5rem;
        line-height: 1.5rem;
        font-size: 1.2rem;
      }
      .adress {
        height: 1.5rem;
        line-height: 1.5rem;
        font-size: 1.2rem;
      }
    }
  }
  .order-total {
    padding-top: 3rem;
    .orderTitle {
      background-color: $colorB;
      color: $colorG;
      height: 3rem;
      line-height: 3rem;
      padding-left: 1rem;
      font-size: 1.5rem;
    }
    .priceWrrap {
      box-shadow: inset 0 1px 0 0 #e5e5e5, inset -1px 0 0 0 #e5e5e5,
        inset 0 -1px 0 0 #e5e5e5, inset 1px 0 0 0 #e5e5e5;
      padding: 2rem;
      .price {
        height: 1.5rem;
        line-height: 1.5rem;
        font-size: 1.2rem;
      }
      .priceDetail {
        margin-top: 1rem;
        height: 1.5rem;
        line-height: 1.5rem;
        font-size: 1.2rem;
        .icon-down {
          display: inline-block;
          width: 14px;
          height: 10px;
          background: url("/imgs/icon-down.png") no-repeat center;
          background-size: contain;
          margin-left: 9px;
          transition: all 0.5s;
          cursor: pointer;
          &.up {
            transform: rotate(180deg);
          }
        }
        .icon-up {
          transform: rotate(180deg);
        }
      }
      .item-detail {
        .item-good {
          .detail-info {
            img {
              width: 8rem;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
  .pay {
    padding-top: 3rem;
    .payHeader {
      background-color: $colorB;
      color: $colorG;
      height: 3rem;
      line-height: 3rem;
      padding-left: 1rem;
      font-size: 1.5rem;
    }
    .payWrrap {
      border: 1px solid #d7d7d7;
      .alipay {
        background: url("/imgs/icon-ali.png") no-repeat center;
        background-size: 8rem 3rem;
        cursor: pointer;
        width: 13rem;
        height: 4rem;
        display: inline-block;
        margin: 1rem;
        box-shadow: inset -1px 0 0 0 #ddd, inset 0 -1px 0 0 #ddd,
          inset 1px 0 0 0 #ddd, inset 0 1px 0 0 #ddd !important;
      }
      .wechatPay {
        background: url("/imgs/icon-wechat.png") no-repeat center;
        background-size: 9rem 3rem;
        cursor: pointer;
        width: 13rem;
        height: 4rem;
        display: inline-block;
        margin: 1rem;
        box-shadow: inset -1px 0 0 0 #ddd, inset 0 -1px 0 0 #ddd,
          inset 1px 0 0 0 #ddd, inset 0 1px 0 0 #ddd !important;
      }
      .checked {
        box-shadow: inset -1px 0 0 0 #222, inset 0 -1px 0 0 #222,
          inset 1px 0 0 0 #222, inset 0 1px 0 0 #222 !important;
      }
    }
  }
  .checkButton {
    margin: 1rem;

    .fill {
      height: 4rem;
    }
    .submitOrder {
      text-align: center;
      line-height: 4rem;
      color: $colorG;
      background-color: $colorB;
      border-radius: 3rem;
      cursor: pointer;
    }
  }

  .modal-content {
    text-align: center;
  }
}
</style>
