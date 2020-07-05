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
        123
      </div>
      <div class="news-box">
        123
      </div>
      <div class="news-box">
        123
      </div>
      <div class="news-box">
        123
      </div>
      <div class="news-box">
        123
      </div>
      <div class="news-box">
        123
      </div>
      <div class="video-box"></div>
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
    height: 200px;
  }
}
</style>
