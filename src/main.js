import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import {
  Message,
  Input,
  Row,
  Col,
  Card,
  Form,
  FormItem,
  Checkbox,
  InputNumber,
  Cascader
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueLazyLoad from "vue-lazyload";
import VueCookie from "vue-cookie";
import "./assets/iconfont";

//根据前端的跨域方式做调整
axios.defaults.baseURL = "/api";
axios.defaults.timeout = 8000;
//接口返回的错误拦截
axios.interceptors.response.use(
  function(response) {
    let res = response.data;
    let path = location.hash;
    if (res.status == 0) {
      return res.data;
    } else if (res.status == 10) {
      if (path != "#/index") {
        window.location.href = "/#/login";
      }
      return Promise.reject(res);
    } else {
      Message.warning(res.msg);
      return Promise.reject(res);
    }
  },
  error => {
    let res = error.response;
    Message.error(res.data.message);
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Checkbox);
Vue.use(InputNumber);
Vue.use(Cascader);
Vue.config.productionTip = false;
Vue.use(VueLazyLoad, {
  loading: "/imgs/loading.gif"
});
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
