import { ref } from "vue";
import { defineStore } from "pinia";

export const useGraphStore = defineStore("graph", () => {
  const modules = ref([]);
  const summary = ref({});

  const setModules = (data) => {
    modules.value = data;
  }

  const setSummary = (data) => {
    summary.value = data;
  }

  const filterModules = (source) => {
    return modules.value.filter((item) => item.source.toLowerCase().includes(source.toLowerCase()));
  }

  const findModuleInfo = (sourceName) => {
    return modules.value.find((item) => item.source === sourceName);
  }

  return { modules, summary, setModules, setSummary, filterModules, findModuleInfo };
});
