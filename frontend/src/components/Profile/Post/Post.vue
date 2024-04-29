<script setup lang="ts">
import axios from "axios";
import {onMounted, type Ref, ref} from "vue";
import PostPage from "@/components/Profile/Post/PostPage/PostPage.vue";
import Alert from "@/components/ui/Alert.vue";

const text: Ref<string> = ref("");

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

async function getPosts() {
  axios.get(`http://localhost:3006/get_posts_user?author_id=${props.id}`).then((resp) => {
    posts.value = resp.data;
    console.log(resp.data);
  }).catch((err) => {
    console.log(err);
  })
}

onMounted(() => {
  getPosts();
});

async function createPost(event: Event) {
  event.preventDefault();

  axios.post(`http://localhost:3006/create_post`, {
    author_id: props.id,
    text: text.value
  }).then(() => {
    getPosts();
  }).catch((err) => {
    console.log(err);
  });

  text.value = "";
}
</script>

<template>
  <form @submit="createPost">
    <textarea
        type="text"
        placeholder="Расскажите о своем настроении"
        v-model="text"
    />
    <button class="button">Опубликовать</button>
  </form>

  <div class="mt-5 mb-5">
    <div v-for="(post, index) in posts" :key="index">
      <PostPage :createdAt="post.createdAt" :text="post.text" :login="props.login"/>
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

textarea::placeholder {
  color: rgb(213, 213, 213)
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