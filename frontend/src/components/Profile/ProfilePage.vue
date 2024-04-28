<script setup lang="ts">

import {useUserData} from "@/stores/userData";

const userData = useUserData();
userData.getUserData();
const rawData = JSON.parse(JSON.stringify(userData.userData));

console.log(rawData);
</script>

<template>
  <div>
    id: {{ rawData._id }}
    login: {{rawData.login}}

  </div>
</template>

<style scoped>

</style>