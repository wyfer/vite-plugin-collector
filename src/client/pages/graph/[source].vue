<script setup>
import { useGraphStore } from "@/stores/graph.js";
import { useServerStore } from "@/stores/server.js";
import { openInEditor } from "@/tools/index.js";

const { findModuleInfo } = useGraphStore();
const { serverUrl } = useServerStore();

const route = useRoute();
const router = useRouter();

const source = ref("");
const moduleInfo = ref({});

const back = () => router.back();

const seeFile = filePath => {
  const url = findModuleInfo(filePath)?.source;
  openInEditor(serverUrl, url);
};

onMounted(() => {
  moduleInfo.value = "";

  if (!route.params?.source) {
    return "";
  }

  source.value = route.params.source;
  moduleInfo.value = findModuleInfo(source.value);
});

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const categories = ref([
  {
    name: "List",
  },
  {
    name: "Graph",
  },
]);
</script>

<template>
  <div class="bg-white min-h-full pr-4 pl-4">
    <div class="w-full sticky top-0 bg-white pt-4 pb-2 z-10">
      <h2 class="text-lg font-bold leading-7 text-indigo-600 flex items-center">
        <a @click="back" class="cursor-pointer">
          <svg
            class="h-6 w-6 fill-current md:h-8 md:w-8"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
          </svg>
        </a>
        <span class="text-gray-900 mr-2">Current:</span>
        {{ source }}
      </h2>
    </div>

    <div class="w-full p-2">
      <div class="w-full mt-4">
        <TabGroup :defaultIndex="0">
          <TabList class="flex max-w-64 space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab v-for="category in categories" as="template" :key="category" v-slot="{ selected }">
              <button
                :class="[
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-3',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 ',
                  selected ? 'bg-white text-blue-700 shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                ]">
                {{ category.name }}
              </button>
            </Tab>
          </TabList>
          <TabPanels
            class="mt-2"
            :class="['rounded-xl bg-white', 'ring-white/60 ring-offset-2 ring-offset-blue-400  focus:ring-2']">
            <TabPanel>
              <h3 class="text-md font-semibold leading-7 text-slate-400 mb-4">dependents(被依赖)</h3>

              <ul role="list" class="divide-y divide-gray-100 overflow-y-auto overflow-x-hidden max-h-[500px]">
                <li
                  class="flex justify-between gap-x-6 py-5 cursor-alias hover:bg-gray-100 hover:rounded-md p-3"
                  v-for="(dependent, index) in moduleInfo.dependents"
                  :key="index">
                  <div class="flex min-w-0 gap-x-4">
                    <div class="min-w-0 flex-auto">
                      <p class="text-sm font-semibold leading-6 text-gray-900">{{ dependent }}</p>
                    </div>
                  </div>
                  <div class="shrink-0 flex flex-col items-end">
                    <button class="btn btn-active btn-accent btn-sm" @click="seeFile(dependent)">VS Code</button>
                  </div>
                </li>
              </ul>

              <div
                class="hero-content text-center bg-slate-200 mt-4 max-w-full"
                v-if="moduleInfo?.dependents?.length === 0">
                <div class="max-w-md">
                  <p class="py-6">Not Found.</p>
                </div>
              </div>

              <h3 class="text-md font-semibold leading-7 text-slate-400 mt-4 mb-4">dependencies(依赖)</h3>

              <ul role="list" class="divide-y divide-gray-100 overflow-y-auto overflow-x-hidden max-h-[500px]">
                <li
                  class="flex justify-between gap-x-6 py-5 hover:bg-gray-100 hover:rounded-md p-3"
                  v-for="(dependency, index) in moduleInfo.dependencies"
                  :key="index">
                  <div class="flex min-w-0 gap-x-4">
                    <div class="min-w-0 flex-auto">
                      <p class="text-sm font-semibold leading-6 text-gray-900">{{ dependency.resolved }}</p>
                    </div>
                  </div>
                  <div class="shrink-0 flex flex-col items-end">
                    <button class="btn btn-active btn-accent btn-sm" @click="seeFile(dependency.resolved)">
                      VS Code
                    </button>
                  </div>
                </li>
              </ul>

              <div
                class="hero-content text-center bg-slate-200 mt-4 max-w-full"
                v-if="moduleInfo?.dependencies?.length === 0">
                <div class="max-w-md">
                  <p class="py-6">Not Found.</p>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <h3 class="text-md font-semibold leading-7 text-slate-400 mb-4">dependents(被依赖)</h3>

              <template v-if="moduleInfo?.dependents?.length > 0">
                <DataView :moduleInfo="moduleInfo" sourceKey="dependents"></DataView>
              </template>

              <div class="hero-content text-center bg-slate-200 mt-4 max-w-full" v-else>
                <div class="max-w-md">
                  <p class="py-6">Not Found.</p>
                </div>
              </div>

              <h3 class="text-md font-semibold leading-7 text-slate-400 mt-4 mb-4">dependencies(依赖)</h3>

              <template v-if="moduleInfo?.dependencies?.length > 0">
                <DataView :moduleInfo="moduleInfo" sourceKey="dependencies"></DataView>
              </template>

              <div class="hero-content text-center bg-slate-200 mt-4 max-w-full" v-else>
                <div class="max-w-md">
                  <p class="py-6">Not Found.</p>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  </div>
</template>
