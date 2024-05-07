<script setup lang="ts">
import axios from 'axios';
import { decode } from 'jwt-js-decode';
import { onMounted, ref, type Ref } from 'vue';
import { api } from '../../../Constants'

interface userData {
    _id?: string;
    password?: string;
    login?: string;
}

interface IPostsData {
    _id?: string;
    text?: string;
    author_id?: string;
    createdAt?: Date;
}

const userData: Ref<userData> = ref({});
const postsData: Ref = ref<IPostsData[]>([]);
const userPostData: Ref = ref<userData[]>([]);

const token: string = localStorage.getItem("token") ?? "";
let jwt = decode(token);;
let id: string = jwt.payload.id;

async function getUserData() {
    if (token) {
        axios.get(`${api}/get_user_data?id=${id}`).then((resp) => {
            userData.value = resp.data;
        }).catch((err) => {
            console.log(err);
        });
    }
}

async function getPosts() {
    axios.get(`${api}/get_all_posts`).then((resp) => {
        postsData.value = resp.data
    }).catch((err) => {
        console.log(err);
    });
}

async function getUserDataByPost() {
    await axios.get(`${api}/get_user_data_by_post`).then((reps) => {

    }).catch((err) => {
        console.log(err);
    });
}

onMounted(() => {
    getUserData();
    getPosts();
});


</script>

<template>
    <div>
    </div>
</template>

<style scoped></style>