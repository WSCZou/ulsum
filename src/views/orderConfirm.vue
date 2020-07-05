<template>
  <div class="orderConfirm">
    <div class="container">
      <div class="orderName">结算</div>
      <div class="adressHeader">收货地址</div>
      <div class="adress">
        <div class="adress-box">
          <el-row>
            <el-col
              :span="6"
              v-for="(item, index) in adressList"
              :key="item.id"
              :offset="1"
            >
              <el-card
                class="box-card"
                :class="{ checked: index === checkIndex }"
                @click.native="checkIndexChange(index)"
              >
                <h2 class="receive-name">{{ item.receiverName }}</h2>
                <div class="phone">{{ item.receiverMobile }}</div>
                <div class="street">
                  {{
                    item.receiverProvince +
                      " " +
                      item.receiverCity +
                      " " +
                      item.receiverDistrict +
                      " " +
                      item.receiverAddress
                  }}
                </div>
                <div class="action">
                  <a href="javascript:;" class="fl" @click="delAddress(item)">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-shanchu"></use>
                    </svg>
                  </a>
                  <a
                    href="javascript:;"
                    class="fr"
                    @click="editAddressModal(item)"
                  >
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-chuangzuo"></use>
                    </svg>
                  </a>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-card class="box-card add">
                <div class="add-action" @click="addAdress">
                  <svg class="icon-add" aria-hidden="true">
                    <use xlink:href="#icon-zengjia"></use>
                  </svg>
                  <div>添加新地址</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="goods">商品</div>
      <div class="goods-item">
        <ul>
          <li v-for="(item, index) in cartList" :key="index">
            <div class="goods-img">
              <img v-lazy="item.productMainImage" alt="" />
            </div>
            <div class="detail">
              <div class="detail-name">{{ item.productName }}</div>
              <div class="detail-subtitle">{{ item.productSubtitle }}</div>
            </div>
            <div class="detail-num">
              数量:{{ item.quantity }} @ ￥{{ item.productPrice }}
            </div>
            <div class="goods-totalPri">￥{{ item.productTotalPrice }}</div>
          </li>
        </ul>
      </div>
      <div class="delivery">配送方式</div>
      <div class="totalPrice">小计</div>

      <el-row :gutter="5" class="orderButton">
        <el-col :xs="0" :sm="14"><div class="fill">123</div></el-col>
        <el-col :xs="24" :sm="3">
          <div class="backCart" @click="backCart">返回购物车</div></el-col
        >
        <el-col :xs="24" :sm="3">
          <div class="submitOrder" @click="orderSubmit">提交订单</div></el-col
        >
      </el-row>
    </div>
    <modal
      title="删除确认"
      btnType="1"
      :showModal="showDelModal"
      @cancel="closeModal"
      @submit="submitAddress"
    >
      <template v-slot:content>
        <p>您确认要删除此地址吗？</p>
      </template>
    </modal>
    <modal
      title="新增地址"
      btnType="1"
      :showModal="showEditModal"
      @cancel="closeModal"
      @submit="submitAddress"
    >
      <template v-slot:content>
        <div class="edit-wrap">
          <el-form
            ref="elForm"
            :model="formData"
            :rules="rules"
            size="medium"
            label-width="9rem"
          >
            <el-form-item label="姓名" prop="receiverName">
              <el-input
                v-model="formData.receiverName"
                placeholder="请输入姓名"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="receiverMobile">
              <el-input
                v-model="formData.receiverMobile"
                placeholder="请输入电话号码"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="adressSelect">
              <el-cascader
                v-model="formData.adressSelect"
                :options="adressSelectOptions"
                :props="adressSelectProps"
                :style="{ width: '100%' }"
                placeholder="请选择地址"
                clearable
              ></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="receiverAddress">
              <el-input
                v-model="formData.receiverAddress"
                type="textarea"
                placeholder="请输入详细地址"
                :autosize="{ minRows: 4, maxRows: 4 }"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "./../components/Modal";
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
export default {
  name: "order-confirm",
  components: {
    Modal
  },
  data() {
    return {
      adressList: [], //地址列表
      cartList: [], //商品列表
      showEditModal: false, //添加地址弹窗
      showDelModal: false, //是否显示删除弹框
      userAction: "", //用户行为 0：新增 1：编辑 2：删除
      checkIndex: 0, //选中地址
      formData: {
        //表单内容
        receiverName: undefined,
        receiverMobile: undefined,
        adressSelect: [],
        receiverAddress: undefined
      },

      rules: {
        receiverName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        receiverMobile: [
          {
            required: true,
            message: "请输入电话号码",
            trigger: "blur"
          }
        ],
        adressSelect: [
          {
            required: true,
            type: "array",
            message: "请至少选择一个地址",
            trigger: "blur"
          }
        ],
        receiverAddress: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: "blur"
          }
        ]
      },
      adressSelectOptions: regionData,
      adressSelectProps: {
        multiple: false,
        label: "label",
        value: "value",
        children: "children"
      }
    };
  },
  mounted() {
    this.getAddressList();
    this.getCartList();
  },
  methods: {
    initForm() {
      this.formData = {
        receiverName: undefined,
        receiverMobile: undefined,
        adressSelect: [],
        receiverAddress: undefined
      };
    },
    getAddressList() {
      this.axios.get("/shippings").then(res => {
        this.adressList = res.list;
      });
    },
    getCartList() {
      this.axios.get("/carts").then(res => {
        let list = res.cartProductVoList; //获取购物车中所有商品数据
        this.cartTotalPrice = res.cartTotalPrice; //商品总金额
        this.cartList = list.filter(item => item.productSelected);
        this.cartList.map(item => {
          this.count += item.quantity;
        });
      });
    },
    // 打开新增地址弹框
    openAddressModal() {
      this.userAction = 0;
      this.formData = {};
      this.showEditModal = true;
    },
    // 打开编辑地址弹框
    editAddressModal(item) {
      this.userAction = 1;
      this.formData = { ...item, adressSelect: [] };
      this.formData.adressSelect.push(TextToCode[item.receiverProvince].code);
      this.formData.adressSelect.push(
        TextToCode[item.receiverProvince][item.receiverCity].code
      );
      this.formData.adressSelect.push(
        TextToCode[item.receiverProvince][item.receiverCity][
          item.receiverDistrict
        ].code
      );
      this.showEditModal = true;
    },
    delAddress(item) {
      this.formData = item;
      this.userAction = 2;
      this.showDelModal = true;
    },
    addAdress() {
      this.showEditModal = true;
    },
    submitAddress() {
      let params = {};
      let url,
        method = {};
      if (this.userAction == 0) {
        (method = "post"), (url = "/shippings");
      } else if (this.userAction == 1) {
        (method = "put"), (url = `/shippings/${this.formData.id}`);
      } else {
        (method = "delete"), (url = `/shippings/${this.formData.id}`);
      }
      if (this.userAction == 0 || this.userAction == 1) {
        params = {
          receiverName: this.formData.receiverName,
          receiverMobile: this.formData.receiverMobile,
          receiverProvince: CodeToText[this.formData.adressSelect[0]],
          receiverCity: CodeToText[this.formData.adressSelect[1]],
          receiverDistrict: CodeToText[this.formData.adressSelect[2]],
          receiverAddress: this.formData.receiverAddress
        };
      }
      this.axios[method](url, params).then(() => {
        this.closeModal();
        this.getAddressList();
        this.$message.success("操作成功");
      });
    },
    //关闭弹窗
    closeModal() {
      this.initForm();
      this.userAction = "";
      this.showDelModal = false;
      this.showEditModal = false;
    },
    //选择地址
    checkIndexChange(index) {
      this.checkIndex = index;
    },
    // 订单提交
    orderSubmit() {
      let item = this.adressList[this.checkIndex];
      if (!item) {
        this.$message.error("请选择一个收货地址");
        return;
      }
      this.axios
        .post("/orders", {
          shippingId: item.id
        })
        .then(res => {
          this.$router.push({
            path: "/order/pay",
            query: {
              orderNo: res.orderNo
            }
          });
        });
    },
    //返回购物车
    backCart() {
      this.$router.push({
        path: "/cart"
      });
    }
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
.orderConfirm {
  .container {
    .orderName {
      font-size: 2.5rem;
      line-height: 4rem;
      text-align: center;
      padding: 1rem;
      font-weight: 400;
    }
    .adressHeader {
      font-size: 2rem;
      line-height: 4rem;
      padding: 1rem 18rem;
    }
    .adress {
      padding: 1rem 18rem;
      .adress-box {
        .el-col {
          margin-bottom: 20px;
        }
        .add {
          position: relative;
        }
        .box-card {
          height: 12rem;
          border-radius: 1rem;
          cursor: pointer;
          .receive-name {
            height: 2rem;
            line-height: 2rem;
          }
          .phone {
            height: 2rem;
            line-height: 2rem;
          }
          .street {
            height: 1rem;
            line-height: 1rem;
          }
          .action {
            height: 4rem;
            line-height: 4rem;
            .icon {
              width: 1.67rem;
              height: 1.67rem;
              fill: #666666;
              vertical-align: middle;
              &:hover {
                fill: #ff6700;
              }
            }
          }
          .add-action {
            text-align: center;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
            .icon-add {
              width: 2rem;
              height: 2rem;
            }
          }
        }
        .checked {
          border-color: $colorB;
        }
      }
    }
  }
  .goods {
    font-size: 2rem;
    line-height: 4rem;
    padding: 1rem 18rem;
  }
  .goods-item {
    padding: 1rem 16.5rem;
    li {
      display: flex;
      height: 6rem;
      .goods-img {
        width: 7rem;
        text-align: center;
        img {
          height: 5rem;
          vertical-align: middle;
        }
      }
      .detail {
        flex: 4;
        margin-left: 1rem;
        .detail-subtitle {
          color: #6d6d6d;
        }
        vertical-align: middle;
      }
      .detail-num {
        flex: 3;
        color: #6d6d6d;
      }
      .goods-totalPri {
        flex: 1;
        color: #6d6d6d;
      }
    }
  }
  .delivery {
    font-size: 2rem;
    line-height: 4rem;
    padding: 1rem 18rem;
  }
  .totalPrice {
    font-size: 2rem;
    line-height: 4rem;
    padding: 1rem 18rem;
  }
  .orderButton {
    .fill {
      line-height: 4rem;
      background-color: $colorG;
      color: $colorG;
    }
    .submitOrder {
      text-align: center;
      line-height: 4rem;
      color: $colorG;
      background-color: $colorB;
      border-radius: 3rem;

      cursor: pointer;
    }
    .backCart {
      margin-bottom: 1rem;
      text-align: center;
      line-height: 4rem;
      background-color: $colorG;
      color: $colorB;
      border-radius: 3rem;
      box-shadow: inset 0 1px 0 0 #ccc, inset -1px 0 0 0 #ccc,
        inset 0 -1px 0 0 #ccc, inset 1px 0 0 0 #ccc;

      cursor: pointer;
    }
  }
}
.el-cascader-menu {
  width: 13rem;
  min-width: 13rem;
}
</style>
