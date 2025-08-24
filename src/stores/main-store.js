import {reactive, ref} from 'vue'
import { defineStore } from 'pinia'
import Cookies from "js-cookie";
import {uuid} from "@/utils/uuid-generator.js";

export const useMainStore = defineStore('main-store', () => {
  const result = ref(null);
  const userId = Cookies.get('user_id');
  const step = ref(['form'])
  const order = [
    "introduction",
    "main_karmic_lesson",
    "repeating_patterns",
    "strengths_and_talents",
    "life_transformation",
    "practical_recommendations",
    "spiritual_practice",
    "conclusion"
  ];
  const orderedResult = reactive({});

  function setUuid() {
    const id = uuid();
    Cookies.set("user_id", id, { expires: 1 });
    return id
  }

  return {
    result,
    order,
    orderedResult,
    step,
    userId,
    setUuid
  }
})
