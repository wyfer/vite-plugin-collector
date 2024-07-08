import { ref } from "vue";
import { defineStore } from "pinia";

export const useServerStore = defineStore("server", () => {
  const serverUrl = ref('');

  const setServerUrl = (data) => {
    serverUrl.value = data;
  }

  return { serverUrl, setServerUrl };
});
