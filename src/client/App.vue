<script setup>
import { TransitionRoot } from "@headlessui/vue";

const menuItems = ref([
  {
    groupName: "FEATURE",
    groupItems: [
      {
        itemName: "COLLECTOR",
        tag: "",
        children: [
          {
            name: "ASSETS",
            path: "/assets",
            tag: "资源",
          },
          {
            name: "GRAPH",
            path: "graph",
            tag: "分析",
          },
        ],
      },
    ],
  },
]);

const menuActive = ref("/");

const showTransition = ref(true);

const resetIsShowing = () => {
  showTransition.value = false;

  setTimeout(() => {
    showTransition.value = true;
  }, 500);
};

const route = useRoute();
watch(route, () => {
  resetIsShowing();
  menuActive.value = route.path;
});
</script>

<template>
  <div class="size-full">
    <div class="flex overflow-hidden h-full">
      <div class="hidden lg:block w-60">
        <div data-simplebar="init" class="h-screen lg:sticky">
          <div class="simplebar-wrapper h-full" style="margin: 0">
            <div
              class="simplebar-content-wrapper"
              tabindex="0"
              role="region"
              aria-label="scrollable content"
              style="height: 100%; overflow: hidden">
              <div class="simplebar-content" style="padding: 0">
                <ul class="menu menu-md rounded-box w-60">
                  <li class="mb-0.5">
                    <router-link
                      class="hover:bg-base-content/15"
                      to="/"
                      :class="{ 'bg-base-content/10': menuActive === '/' }">
                      <div class="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          aria-hidden="true"
                          role="img"
                          font-size="18"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24">
                          <g
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2">
                            <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                            <path d="m12 15l5 6H7l5-6z"></path>
                          </g>
                        </svg>
                        HOME
                      </div>
                    </router-link>
                  </li>

                  <template v-for="(item, index) in menuItems" :key="index">
                    <li class="menu-title font-semibold">{{ item.groupName }}</li>
                    <li class="mb-0.5" v-for="(groupItem, groupItemIndex) in item.groupItems" :key="groupItemIndex">
                      <details open>
                        <summary>
                          <div class="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              aria-hidden="true"
                              role="img"
                              font-size="18"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24">
                              <g
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2">
                                <path
                                  d="m7.5 4.27l9 5.15M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                                <path d="m3.3 7l8.7 5l8.7-5M12 22V12"></path>
                              </g>
                            </svg>
                            {{ groupItem.itemName }}
                            <div
                              v-show="groupItem.tag"
                              class="ms-0 rounded bg-base-content/10 px-1.5 py-[3px] text-[12px]/none opacity-70">
                              {{ groupItem.tag }}
                            </div>
                          </div>
                        </summary>
                        <ul>
                          <li class="mb-0.5" v-for="(menu, menuIndex) in groupItem.children" :key="menuIndex">
                            <router-link
                              class="hover:bg-base-content/15"
                              :to="menu.path"
                              :class="{ 'bg-base-content/10 text-primary': menuActive.includes(menu.path) }">
                              <div class="flex items-center gap-2">
                                {{ menu.name }}
                                <div
                                  class="ms-0 rounded bg-base-content/10 px-1.5 py-[3px] text-[12px]/none opacity-70">
                                  {{ menu.tag }}
                                </div>
                              </div>
                            </router-link>
                          </li>
                        </ul>
                      </details>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-wrapper overflow-auto flex-1 h-full border-l-2 border-solid border-indigo-600 bg-white">
        <div class="flex flex-col min-h-full">
          <router-view v-slot="{ Component }">
            <transition name="route" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.route-enter-active,
.route-leave-active {
  transition: opacity 0.2s;
}
.route-enter,
.route-leave-to {
  opacity: 0;
}
</style>
