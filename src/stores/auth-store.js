// src/stores/auth.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import {instance} from "@/api/instance.js";
import {CARMA_ROUTES} from "@/api/endpoints.js";


export const useAuthStore = defineStore('auth', () => {
    // state
    const user = ref(null)
    const reports = ref([])
    const loading = ref(false)
    const error = ref(null)

    // getters
    const isAuth = computed(() => !!(user.value && user.value.id))

    // helpers
    function setUserCookie(id) {
        Cookies.set('user_id', id, { expires: 7 })
    }
    function clearUserCookie() {
        Cookies.remove('user_id')
    }

    // actions
    async function register({ email, name, birthday, city }) {
        loading.value = true
        error.value = null
        try {
            const { data } = await instance.post(CARMA_ROUTES.REGISTER, {
                email,
                name,
                birthday,
                city,
            })

            return data.reportUuid
        } catch (e) {
            error.value =
                (e && e.response && e.response.data && e.response.data.message) ||
                (e && e.message) ||
                'Register failed'
            throw e
        } finally {
            loading.value = false
        }
    }

    async function login(email) {
        loading.value = true
        error.value = null
        try {
            const { data } = await instance.post(CARMA_ROUTES.LOGIN, { email })
            reports.value = data || null
            return data
        } catch (e) {
            error.value =
                (e && e.response && e.response.data && e.response.data.message) ||
                (e && e.message) ||
                'Login failed'
            throw e
        } finally {
            loading.value = false
        }
    }

    async function fetchMe(userId) {
        loading.value = true
        error.value = null
        try {
            const { data } = await instance.get(CARMA_ROUTES.GET_PROFILE.replace(':user_id', userId))
            user.value = data.user;
            reports.value = Array.isArray(data && data.reports) ? data.reports : []
            return data
        } catch (e) {
            user.value = null
            reports.value = []
            clearUserCookie()
        } finally {
            loading.value = false
        }
    }

    async function logout() {
        loading.value = true
        error.value = null
        try {
            // опционально: await api.post('/users/logout')
        } catch (_) {
            // ignore
        } finally {
            user.value = null
            reports.value = []
            clearUserCookie()
            loading.value = false
        }
    }

    return {
        user,
        reports,
        loading,
        error,
        isAuth,
        register,
        login,
        fetchMe,
        logout,
    }
})
