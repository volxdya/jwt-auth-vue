<script setup lang="ts">
import axios from "axios";
import { onMounted, type Ref, ref } from "vue";
import PostPage from "@/components/Profile/Post/PostPage/PostPage.vue";
import Alert from "@/components/ui/Alert.vue";

const text: Ref<string> = ref("");
const isSuccess: Ref<boolean> = ref(false);
const isError: Ref<boolean> = ref(false);
const isBold: Ref<boolean> = ref(false);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  }
});

interface posts {
  text: String;
  author_id: String;
  createdAt: Date;
}

const posts = ref<posts[]>([]);

function error() {
  isSuccess.value = false;
  isError.value = true;

  setInterval(() => {
    isError.value = false;
  }, 10000);
}

function success() {
  isError.value = false;
  isSuccess.value = true;

  setInterval(() => {
    isSuccess.value = false;
  }, 10000);
}

async function getPosts() {
  await axios.get(`http://localhost:3006/get_posts_user?author_id=${props.id}`).then((resp) => {
    posts.value = resp.data;
  }).catch((err) => {
    console.log(err);
  });
}

async function deletePost(post_id: string) {
  await axios.get(`http://localhost:3006/delete_post?id=${post_id}`).then((resp) => {
    console.log(resp.data);
  }).catch((err) => {
    console.log(err);
  });

  getPosts();
}

onMounted(() => {
  getPosts();
});

async function createPost(event: Event) {
  event.preventDefault();

  if (text.value.length < 8) {
    error();
  } else {
    axios.post(`http://localhost:3006/create_post`, {
      author_id: props.id,
      text: text.value
    }).then(() => {
      getPosts();
      success();
    }).catch((err) => {
      console.log(err);
      error();
    });

    text.value = "";
  }
}

if (text.value.charAt(0) == "*") {
  isBold.value = true;
}


</script>

<template>
  <form @submit="createPost">
    <textarea type="text" placeholder="Расскажите о своем настроении" v-model="text" :class="{
      error: isError,
      bold: isBold
    }" />
    <div class="mt-2">
      <transition name="fade">
        <Alert text="Слишком короткий текст" type="danger" v-if="isError" />
      </transition>
      <transition name="fade">
        <Alert text="Успешно!" type="success" v-if="isSuccess" />
      </transition>
    </div>
    <button class="button">Опубликовать</button>
  </form>

  <div class="mt-5 mb-5">
    <div v-for="(post, index) in posts" :key="index">
      <PostPage :createdAt="post.createdAt" :text="post.text" :login="props.login" :deletePost="deletePost"
        :_id="post._id" />
    </div>
  </div>
</template>

<style scoped>
textarea {
  width: 900px;
  background: none;
  padding: 10px 0 0 15px;
  border: none;
  outline: 1px solid #2a2a2a;
  color: rgb(254, 254, 254);
  height: 80px;
  border-radius: 15px;
  font-size: 18px;
}

textarea:focus {
  transform: scale(1.02);
  background: rgba(47, 47, 47, 0.46);
  transition: transform 0.4s ease-in-out, background 0.4s ease-in-out;
}

.bold {
  font-weight: bold;
}

textarea::placeholder {
  color: rgb(213, 213, 213)
}

.error {
  outline: 1px solid rgb(254, 55, 55);
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
</style>