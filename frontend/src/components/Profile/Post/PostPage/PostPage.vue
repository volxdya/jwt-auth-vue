<script setup lang="ts">
import dayjs from 'dayjs';
import Trash from '@/components/icons/Trash.vue';
import Pen from '@/components/icons/Pen.vue';
import { ref, type PropType, type Ref } from 'vue';

const isEdit: Ref<boolean> = ref(false);

interface deleteFn {
  (post_id: string): Promise<void>
}

const props = defineProps({
  login: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    required: true,
    default: ""
  },
  text: {
    type: String,
    required: true,
    default: ""
  },
  createdAt: {
    type: Date,
    required: true,
  },
  deletePost: {
    type: Function as PropType<deleteFn>,
    required: true
  }
});

function getTimePost(time: Date) {
  return dayjs(time).format('DD.MM.YYYY');
}

</script>
<template>
  <div class="post">
    <div class="row">
      <div class="col-1">
        <img src="https://i.pinimg.com/736x/17/fc/60/17fc600d9bfd9f4aff6bdd718e82df98.jpg" alt="avatar" class="avatar">
      </div>
      <div class="col-9 px-5">
        <p class="login">{{ props.login }}</p>
        <p class="date">{{ getTimePost(props.createdAt) }}</p>
      </div>
      <div class="col-2 d-flex align-items-center justify-content-end gap-3">
        <Pen />
        <Trash @click="deletePost(props._id)" />
      </div>
    </div>
    <!-- <p class="text mt-3">{{ props.text }}</p> -->
    <form class="mt-3">
      <input type="text" >
      <div class="d-flex justify-content-end">
        <button>Редактировать</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login,
.date,
.text {
  color: aliceblue;
  margin: 0;
}

.text {
  font-size: 20px;
}

.date {
  font-size: 16px;
  color: #9c9c9c;
}

.login {
  font-size: 28px;
}

.post {
  padding: 25px;
  outline: 1px solid #2a2a2a;
  width: 900px;
  background: rgba(43, 43, 43, 0.44);
  border-radius: 15px;
  margin-bottom: 55px;
}

.avatar {
  border-radius: 50%;
  height: 80px;
  width: 80px;
  object-fit: cover;
}

input {
  width: 100%;
  background: none;
  padding: 10px 0 0 15px;
  border: none;
  outline: 1px solid #2a2a2a;
  color: rgb(254, 254, 254);
  height: 40px;
  border-radius: 15px;
  font-size: 17px;
}

input:focus {
  transform: scale(1.02);
  background: rgba(47, 47, 47, 0.46);
  transition: transform 0.4s ease-in-out, background 0.4s ease-in-out;
}

</style>