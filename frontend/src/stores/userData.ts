import {defineStore} from 'pinia'
import axios from "axios";
import {decode} from "jwt-js-decode";
import {ref} from "vue";

const token = localStorage.getItem("token");
let jwt = decode(token);

export const useUserData = defineStore('counter', () => {
    const userData = ref({});

    async function getUserData() {
        const response = await axios.get(`http://localhost:3006/get_user_data/`, {
            params: {
                id: jwt.payload.id
            }
        });

        userData.value = response.data;

    }

    return {userData, getUserData}
})

