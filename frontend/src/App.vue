<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapperApp">
    <div class="content">
      <div class="container">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: #f9f9f9;
}

.wrapperApp {
    background-image: url("https://i.pinimg.com/564x/3c/a9/7e/3ca97e8538585ba87eed3b0ce36960f6.jpg");
    width: 100%;
    position: relative;
    background-position: center;
    background-size: cover;
    background-repeat: repeat;
    height: 973px;
}

.content {
    position: absolute;
    top: 0;
    height: 950px;
    z-index: 2;
    width: 100%;
}

.content {
    overflow-x: hidden;
    overflow: scroll;
}

.content::-webkit-scrollbar {
    display: none;
}
</style>
