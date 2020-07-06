<template>
  <div class="login">
    <el-card class="box-card" header="登录">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <button type="submit" class="btn">登录</button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      model: {},
      userId: ""
    };
  },
  methods: {
    login() {
      let { username, password } = this.model;
      this.axios
        .post("/user/login", {
          username,
          password
        })
        .then(res => {
          console.log(res.id);
          this.$cookie.set("userId", res.id, { expires: "Session" });
          this.saveUserName(res.username);
          this.$router.push({
            name: "index",
            params: {
              from: "login"
            }
          });
        });
    },
    ...mapActions(["saveUserName"])
  }
};
</script>

<style lang="scss">
.login {
  .box-card {
    width: 400px;
    margin: 100px auto;
    .btn {
      border: none;
    }
  }
}
</style>
