<script setup>
import { filesize } from "filesize";
import rpc from "@/logic/PRC.js";

const rootFiles = ref([]);
const rootTreeFiles = ref({});
const files = ref([]);
const isSearching = ref(false);

const getName = path => {
  const match = path.match(/[^/\\]+$/);
  // 如果匹配到，返回文件名，否则返回空字符串
  return match ? match[0] : "未定义";
};

const getFileName = computed(() => path => {
  return getName(path);
});

const getFileSize = computed(() => size => {
  if (!size) return size;
  return filesize(size, { standard: "jedec" });
});

const searchInput = ref("");
const searchFile = async () => {
  if (isSearching.value) return;

  isSearching.value = true;

  files.value = rootFiles.value.filter(file => {
    return getName(file.path).includes(searchInput.value);
  });

  isSearching.value = false;
};

onMounted(async () => {
  const rpcInstance = await rpc();
  const { list, tree } = await rpcInstance.getFiles();
  rootFiles.value = list;
  rootTreeFiles.value = tree;
});
</script>

<template>
  <div class="bg-white min-h-full pr-4 pl-4">
    <div class="w-full sticky top-0 bg-white pt-4 pb-2 z-10">
      <h2 class="text-lg font-bold leading-7 text-indigo-600" id="slide-over-title">Assets Preview</h2>
      <div class="flex items-center gap-4 w-full mt-4">
        <label class="input input-bordered flex items-center gap-2 w-96">
          <input type="text" class="grow" placeholder="Search file" v-model="searchInput" @keydown.enter="searchFile" />
          <span v-show="isSearching" class="loading loading-spinner text-accent"></span>
        </label>
        <!-- <div class="flex items-center">
          <div class="flex-none rounded-full bg-emerald-500/20 p-1">
            <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
          </div>
          <div>current Total: {{ files.length }}</div>
        </div> -->
        <div class="flex items-center">
          <div class="flex-none rounded-full bg-emerald-500/20 p-1 mr-2">
            <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
          </div>
          Total Length: {{ rootFiles.length }}
        </div>
      </div>
    </div>

    <div class="w-full p-2">
      <ul role="list" class="divide-y divide-gray-100 min-h-full">
        <li class="flex justify-between gap-x-6 py-2 bg-white" v-for="(file, index) in files" :key="index">
          <div class="flex min-w-0 gap-x-4">
            <div class="avatar p-2" v-if="file.type === 'image'">
              <div class="w-8 rounded">
                <img class="object-contain" :src="file.publicPath" />
              </div>
            </div>

            <div class="min-w-0 flex-auto">
              <p class="text-md font-semibold leading-6 text-gray-900 break-all">{{ getFileName(file.path) }}</p>
              <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ file.publicPath }}</p>
            </div>
          </div>
          <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <div class="mt-1 flex items-center gap-x-1.5">
              <div class="stat-title text-primary">{{ file.type }}</div>
            </div>
            <p class="mt-1 text-xs leading-5 text-gray-500">{{ getFileSize(file.size) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.avatar img {
  object-fit: contain !important;
}
</style>
