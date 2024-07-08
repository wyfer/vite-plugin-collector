<script setup>
import { useGraphStore } from "@/stores/graph.js";
import { useServerStore } from "@/stores/server.js";
import rpc from "@/logic/PRC.js";
import { openInEditor } from "@/tools/index.js";
import { debounce } from "radash";

const { modules, summary, setModules, setSummary, filterModules, findModuleInfo } = useGraphStore();
const { serverUrl } = useServerStore();

const graphSearchResult = ref([]);

const isLoadData = ref(false);
const searchInput = ref("");
const searchFile = debounce(
  {
    delay: 200,
  },
  () => {
    if (isLoadData.value) return;

    graphSearchResult.value = filterModules(searchInput.value);
  }
);

const seeFile = (e, filePath) => {
  e.preventDefault();
  const url = findModuleInfo(filePath)?.source;
  openInEditor(serverUrl, url);
};

onMounted(async () => {
  if (modules.length === 0) {
    isLoadData.value = true;
    const rpcInstance = await rpc();
    const graphData = await rpcInstance.getCruise();

    setModules(graphData.modules);
    setSummary(graphData.summary);
    isLoadData.value = false;
  }
});
</script>

<template>
  <div class="bg-white min-h-full">
    <div class="flex flex-col items-center justify-center w-full h-screen bg-slate-100" v-if="isLoadData">
      <span class="loading loading-dots loading-lg text-primary"></span>
      <h5 class="mt-4 pl-2 text-primary font-bold">loading...</h5>
    </div>

    <div class="w-full sticky top-0 bg-white pt-4 pb-2 z-10 pl-4 pr-4" v-else>
      <h2 class="text-lg font-bold leading-7 text-indigo-600" id="slide-over-title">Component Graph</h2>
      <label class="input input-bordered flex items-center gap-2 mt-4 w-auto">
        <input type="text" class="grow" placeholder="Search file" v-model="searchInput" @input="searchFile" autofocus />
        <span class="loading loading-ring loading-md text-primary"></span>
      </label>
    </div>
    <div class="w-full pl-4 pr-4">
      <ul role="list" class="divide-y divide-gray-100 min-h-full">
        <router-link
          :to="{
            name: '/graph/[source]',
            params: {
              source: item.source,
            },
          }"
          class="flex justify-between gap-x-6 py-2 bg-white items-center hover:bg-gray-100 hover:rounded-md pl-3 pr-3"
          v-for="(item, index) in graphSearchResult"
          :key="index">
          <div class="flex min-w-0 gap-x-4 flex-1 flex-col">
            <p class="text-lg font-semibold leading-6 text-gray-900 break-all">
              {{ item.source }}
            </p>
            <div class="flex items-center gap-4 mt-2">
              <p class="stat-desc text-sm">
                dependents: {{ item.dependents.length }} dependencies: {{ item.dependencies.length }}
              </p>
            </div>
          </div>
          <div class="shrink-0 flex flex-col items-end">
            <button class="btn btn-active btn-accent btn-sm" @click="seeFile($event, item.source)">VS Code</button>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>
