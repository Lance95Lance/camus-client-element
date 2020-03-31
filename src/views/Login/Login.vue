<template>
  <div>
    <input type="text" v-model="loginForm.username" placeholder="用户名" />
    <input type="text" v-model="loginForm.password" placeholder="密码" />
    <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
    };
  },
};
</script>

<style>
</style>