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
    async function register({ email, reportUuid, name, date_of_birth, country }) {
        loading.value = true
        error.value = null
        try {
            const { data } = await instance.post(CARMA_ROUTES.REGISTER, {
                email,
                reportUuid,
                name,
                date_of_birth,
                country,
            })

            user.value = data.user || null
            if (user.value && user.value.id) setUserCookie(user.value.id)

            if (Array.isArray(data.reports)) {
                reports.value = data.reports
            } else if (data.report) {
                reports.value = [data.report, ...reports.value]
            }

            return data.report.reportUuid
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
            user.value = data.user || null
            if (user.value && user.value.id) setUserCookie(user.value.id)
            reports.value = Array.isArray(data.reports) ? data.reports : [];
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
