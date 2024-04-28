<script>
export default {
  data() {
  },
  methods: {
    goLogin() {
      this.$router.push({
        name: 'AuthPage',
      })
    },
    goRegister() {
      this.$router.push({
        name: 'RegisterPage',
      })
    },
  }
};
</script>

<template>
  <div class="d-flex justify-content-center mt-2">
    <div>
      <h2>Привет. Это простая авторизация на Vue3 + Express + MongoDB</h2>
      <div class="d-flex justify-content-center mt-2 gap-2 mt-4">
        <button class="button" @click="goLogin">Войти</button>
        <button class="button" @click="goRegister">Регистрация</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button {
  width: 200px;
  border: 1px solid #646464;
  color: #646464;
  background: none;
  border-radius: 40px;
  height: 35px;
}
.button:hover {
  border: 1px solid #0fa90f;
  color: #0fa90f;

  transition: border 0.4s ease-in-out, color 0.4s ease-in-out;
}
</style>