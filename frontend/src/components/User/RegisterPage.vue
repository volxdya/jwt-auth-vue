<script setup lang="ts">

</script>

<template>
  <div class="wrapper">
    <div class="container-form">
      <form class="form d-flex justify-content-center align-items-center">
       <div class="col-8">
         <div class="row">
           <div class="col-12">
             <label>
               <p class="label">Логин <span class="title">*</span></p>
               <input type="text">
             </label>
           </div>
           <div class="col-12 mt-3">
             <label>
               <p class="label">Пароль <span class="title">*</span></p>
               <input type="text">
             </label>
           </div>
           <RouterLink to="/login">
             <p class="mt-3 go-login">
               <span class="have-account">Есть аккаунт?</span>
               <span class="mx-1 login">Войти</span>
             </p>
           </RouterLink>
           <div class="col-12">
             <button class="mt-4 button">Регистрация</button>
           </div>
         </div>
       </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  color: black;
  width: 45%;
}
.wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  border: none;
  outline: 1px solid #e3e3e3;
  height: 50px;
  width: 400px;
  border-radius: 10px;
  background: linear-gradient(21deg, #f811ff, #11e1ec);
  color: aliceblue;
  font-size: 19px;
}
.button:hover {
  transform: scale(1.05);
  transition: transform 0.5s;
}
.have-account {
  color: #838383;
  font-weight: 500;
}
.container-form {
  height: 700px;
  background: #ffffff;
  border-radius: 25px;
  width: 45%;
  border: 1px solid #e3e3e3;
  display: flex;
  align-content: center;
  justify-content: center;
}
.title {
  color: red;
}
input {
  width: 400px;
  background: none;
  padding-left: 15px;
  border: none;
  outline: 1px solid #e3e3e3;
  height: 40px;
  border-radius: 10px;
}
.label {
  font-weight: 500;
  margin-bottom: 10px;
}
input:focus {
  transform: scale(1.03);
  background: #f1f1f1;
  transition: transform 0.4s ease-in-out, backround 0.4s ease-in-out;
}
</style>