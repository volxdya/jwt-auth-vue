<script setup lang="ts">
import {onMounted, type Ref, ref, watchEffect} from "vue";
import axios from "axios";
import {decode} from "jwt-js-decode";
import PostInput from "@/components/Profile/Post/Post.vue";
import Post from "@/components/Profile/Post/Post.vue";

interface userData {
  _id?: string;
  password?: string;
  login?: string;
}

const userData: Ref<userData> = ref({});

const token: string = localStorage.getItem("token");
let jwt;
let id: string;

if (token) {
  jwt = decode(token);
  id = jwt.payload.id;
}

async function getUserData() {
  if (token) {
    axios.get(`http://localhost:3006/get_user_data?id=${id}`).then((resp) => {
      userData.value = resp.data;
    }).catch((err) => {
      console.log(err);
    });
  }
}

onMounted(() => {
  getUserData();
});

function logOut() {
  localStorage.removeItem("token");
  location.reload();
}
</script>

<template>
  <div class="d-flex justify-content-center">
    <div class="col-9 test" v-if="token">
      <div class="banner">
        <img src="https://i.pinimg.com/564x/17/40/b0/1740b0c94e4457fde617fb133d622b35.jpg" alt="banner" class="banner">
        <div class="row">
          <div class="col-3">
            <img src="https://i.pinimg.com/736x/17/fc/60/17fc600d9bfd9f4aff6bdd718e82df98.jpg" alt="avatar"
                 class="avatar">
          </div>
          <div class="col-8 main-data">
            <p class="login">{{ userData.login }}</p>
          </div>
        </div>
        <div class="post">
          <Post :id="id" :login="userData.login"/>
        </div>
        <!--        <button class="w-100 button" @click="logOut">Выйти</button>-->
      </div>
    </div>
    <div v-else class="mt-3">
      <h4 class="go-login">Вы не авторизованы,
        <RouterLink to="/login">Войти</RouterLink>
      </h4>
    </div>
  </div>
</template>

<style scoped>
.go-login {
  color: aliceblue;
}

.banner {
  width: 100%;
  outline: 3px solid #626262;
  object-fit: cover;
  height: 300px;
  border-radius: 25px;
}

.button {
  border: none;
  outline: 1px solid #2b2b2b;
  height: 50px;
  width: 200px;
  border-radius: 10px;
  background: none;
  color: aliceblue;
  font-size: 19px;
}

.button:hover {
  transform: scale(1.05);
  transition: transform 0.5s;
}

.avatar {
  height: 200px;
  width: 200px;
  position: relative;
  top: -100px;
  z-index: 1;
  border-radius: 50%;
  object-fit: cover;
  left: 30px;
}

.main-data {
  padding: 15px 0 0 40px;
}

.login {
  font-size: 30px;
  font-weight: 500;
  color: aliceblue;
}
</style>