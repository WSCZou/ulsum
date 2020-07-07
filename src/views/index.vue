<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in slideList" :key="index">
            <a
              :href="'/#/product/' + item.id"
              v-if="index == 0 || index == slideList.length - 1"
            >
              <img :src="item.img" />
            </a>
            <a :href="'/#/product/' + item.id" v-else>
              <img v-lazy="item.img" />
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="news-box">
        <el-row :gutter="20" v-for="item in newsList" :key="item.id">
          <el-col :xs="24" :sm="{ span: 10, offset: 4 }">
            <div class="news-img">
              <img :src="item.img" alt="" class="news" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="{ span: 7, offset: 1 }">
            <div class="news-text">{{ item.text }}</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--<modal
      title="提示"
      sureText="查看购物车"
      btnType="1"
      modalType="middle"
      :showModal="showModal"
    >
      <template v-slot:content>
        <p>商品已添加到购物车</p>
      </template>
    </modal>-->
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "index",
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      slideList: [
        {
          id: "42",
          img: "/imgs/chair.jpg"
        },
        {
          id: "45",
          img: "/imgs/box.jpg"
        },
        {
          id: "46",
          img: "/imgs/weiyi-green.jpg"
        },
        {
          id: "",
          img: "/imgs/weiyi.jpg"
        },
        {
          id: "",
          img: "/imgs/weiyi-hei.jpg"
        }
      ],
      newsList: [
        {
          id: "1",
          img: "/imgs/ulsum/1.jpg",
          text:
            "Custom Nike SB Dunk inspired by Notre × Vans Old Skool.   © fiammastudios * ​​​​"
        },
        {
          id: "2",
          img: "/imgs/ulsum/2.jpg",
          text:
            "通过「Breaking2」计划诞生的 Nike NEXT% 科技系统正式面世，Nike 在此体系下开发了 Nike Air Zoom Alphafly NEXT%、Nike Air Zoom Tempo NEXT%、Nike ZoomX Vaporfly NEXT% 以及 Nike Air Zoom Pegasus 37 等针对不同阶段和人群的产品，全系产品都将于7月10日上市。© Nike ∀ ​​​​​​​​"
        },
        {
          id: "3",
          img: "/imgs/ulsum/3.jpg",
          text:
            "ABCD Sofa，来自设计大师 Pierre Paulin 在1968年的作品，设计灵感源自盛放鸡蛋的盒子。 © Kabinet Hubert/massmoderndesign ​​​​​​​​"
        },
        {
          id: "4",
          img: "/imgs/ulsum/4.jpg",
          text: "「印」花？  © Filling Pieces * ​​​​​​​​​​​​"
        },
        {
          id: "5",
          img: "/imgs/ulsum/5.jpg",
          text: "Air Jordan 6 Retro「Quai 54」新配色。  © Nike ​​​​​​​​​​​​​​​​"
        }
      ],
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: "cube",
        cubeEffect: {
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
      //showModal: false
    };
  }
};
</script>

<style lang="scss">
.index {
  .swiper-box {
    .swiper-container {
      height: 451px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  .news-box {
    margin-top: 10rem;
    .el-row {
      margin-bottom: 5rem;
    }
    .news-img {
      .news {
        width: 100%;
        height: 100%;
      }
    }
    .news-text {
      font-size: 24px;
      font-weight: 700;
    }
  }
}
</style>
