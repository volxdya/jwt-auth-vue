<script setup lang="ts">
import {type Ref, ref, watchEffect} from "vue";
import axios from "axios";
import Alert from "@/components/ui/Alert.vue";

const login: Ref<string> = ref("");
const password: Ref<string> = ref("");
const isSuccess: Ref<boolean> = ref(false);
const isError: Ref<boolean> = ref(false);

function error() {
  login.value = "";
  password.value = "";

  isSuccess.value = false;
  isError.value = true;

  setInterval(() => {
    isError.value = false;
  }, 5000);

}

function success() {
  login.value = "";
  password.value = "";

  isError.value = false;
  isSuccess.value = true;

  setInterval(() => {
    isSuccess.value = false;
  }, 5000);
}


async function register(event: FormDataEvent) {
  event.preventDefault();

  if (login.value == "" || password.value == "") {
    error();
  } else {
    await axios.post("http://localhost:3006/register", {
      login: login.value,
      password: password.value
    }).then(() => {
      success();
    }).catch(() => {
      error();
    });
  }
}

</script>

<template>
  <div class="wrapper">
    <div class="container-form">
      <form class="form d-flex justify-content-center align-items-center" @submit="register">
        <div class="col-8">
          <div class="row">
            <div class="col-12">
              <label>
                <p class="label">Логин <span class="title">*</span></p>
                <input type="text" v-model="login">
              </label>
            </div>
            <div class="col-12 mt-3">
              <label>
                <p class="label">Пароль <span class="title">*</span></p>
                <input type="text" v-model="password">
              </label>
            </div>
            <RouterLink to="/login">
              <p class="mt-3 go-login">
                <span class="have-account">Есть аккаунт?</span>
                <span class="mx-1 login">Войти</span>
              </p>
            </RouterLink>
            <div class="col-12">
              <transition name="fade">
                <div v-if="isSuccess">
                  <Alert
                      text="Успешная регистрация!"
                      type="success"
                  />
                </div>
              </transition>
              <transition name="fade">
                <div v-if="isError">
                  <Alert
                      text="Неизвестная ошибка"
                      type="danger"
                  />
                </div>
              </transition>
            </div>
          </div>
          <div class="col-12">
            <button class="mt-4 button">Регистрация</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .50s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

a {
  text-decoration: none;
  color: black;
  width: 45%;
}

.alert {
  width: 400px;
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