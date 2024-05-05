<script setup lang="ts">
import dayjs from 'dayjs';
import Trash from '@/components/icons/Trash.vue';
import Pen from '@/components/icons/Pen.vue';
import { onMounted, ref, type PropType, type Ref } from 'vue';
import axios from 'axios';
import Heart from '@/components/icons/Heart.vue';

interface deleteFn {
  (post_id: string): Promise<void>;
}

interface getPosts {
  (): Promise<void>;
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
  },
  getPosts: {
    type: Function as PropType<getPosts>,
    required: true
  },
  user_id: {
    type: String,
    required: true,
    default: ""
  }
});

interface likes {
  _id: String;
  user_id: String;
  post_id: String;
  createdAt: Date;
}

const isEdit: Ref<boolean> = ref(false);
const isError: Ref<boolean> = ref(false);
const textPost: Ref<string> = ref(props.text);
const likesPost = ref<likes[]>([]);
const wrongLike = ref(false);

function getTimePost(time: Date) {
  return dayjs(time).format('DD.MM.YYYY');
}

function error() {
  isError.value = true;

  setInterval(() => {
    isError.value = false;
  }, 10000);
}


async function edit(event: Event) {
  event.preventDefault();

  if (textPost.value.length < 6) {
    error();
  }
  else if (textPost.value == props.text) {
    isEdit.value = false;
  }
  else {
    await axios.post(`http://localhost:3006/edit_post`, {
      id: props._id,
      text: textPost.value
    }).then(() => {
      isEdit.value = false;
      isError.value = false;
      props.getPosts();
    }).catch(() => {
      error();
    });
  }
}

async function getLikesByPost() {
  await axios.get(`http://localhost:3006/get_likes_by_post`, {
    params: {
      post_id: props._id
    }
  }).then((resp) => {
    likesPost.value = resp.data;
    console.log(resp.data);
    for (let i = 0; i < likesPost.value.length; i++) {
      if (likesPost.value[i].user_id == props.user_id) {
        wrongLike.value = true;
      } else {
        wrongLike.value = false;
      }
    }
  }).catch((err) => {
    console.log(err);
  });
}


async function like() {

  if (!wrongLike.value) {
    await axios.post(`http://localhost:3006/create_like`, {
      post_id: props._id,
      user_id: props.user_id
    });
  }

  else {
    await axios.post(`http://localhost:3006/delete_like`, {
      post_id: props._id
    }).then(() => {
      wrongLike.value = false;
    });
  }

  getLikesByPost();
}

onMounted(() => {
  getLikesByPost();
});

</script>
<template>
  <div class="post">
    <div class="row">
      <div class="col-1">
        <img src="https://i.pinimg.com/736x/17/fc/60/17fc600d9bfd9f4aff6bdd718e82df98.jpg" alt="avatar" class="avatar">
      </div>
      <div class="col-xl-8 col-7 px-5 main-data">
        <p class="login">{{ props.login }}</p>
        <p class="date">{{ getTimePost(props.createdAt) }}</p>
      </div>
      <div class="col-3 d-flex align-items-center justify-content-end gap-3">
        <Pen @click="isEdit = true" />
        <Trash @click="deletePost(props._id)" />
      </div>
    </div>
    <p class="text mt-3" v-if="!isEdit">{{ props.text }}</p>
    <form class="mt-3" @submit="edit" v-else>
      <input type="text" v-model="textPost" :class="{
        error: isError
      }">
      <transition name="fade">
        <p class="feedback-error" v-if="isError">Слишком короткий пост!</p>
      </transition>
      <div class="d-flex justify-content-end">
        <button class="mt-2 button">Редактировать</button>
      </div>
    </form>
    <div class="likes pt-3">
      <transition name="fade">
        <Heart @click="like" :is-wrong="wrongLike" />
      </transition>
      <transition name="fade">
        <span class="count-likes px-2" :class="{
          red: wrongLike
        }">
          {{ likesPost.length }}
        </span>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.count-likes {
  color: gray;
}

.error {
  outline: 1px solid rgb(254, 55, 55);
}

.feedback-error {
  color: rgb(254, 55, 55);
  font-weight: 300;
}

.red {
  color: rgb(204, 36, 36);
}

.login,
.date,
.text {
  color: aliceblue;
  margin: 0;
}

.text {
  font-size: 20px;
}

.button {
  outline: 1px solid #2b2b2b;
  padding: 8px;
  width: 150px;
  border-radius: 10px;
  color: aliceblue;
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

@media screen and (max-width: 768px) {
  .post {
    width: 100%;
  }

  .login,
  .date,
  .text {
    font-size: 17px;
  }

  .avatar {
    height: 70px;
    width: 70px;
  }

  .main-data {
    margin-left: 20px;
  }

  .pen,
  .trash {
    width: 18px;
    height: 18px
  }
}
</style>