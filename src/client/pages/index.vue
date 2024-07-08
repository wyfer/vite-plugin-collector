<script setup>
import rpc from "@/logic/PRC.js";

const packageInfo = ref();

onMounted(async () => {
  const rpcInstance = await rpc();
  packageInfo.value = await rpcInstance.getPackage();
});
</script>

<template>
  <section class="relative isolate overflow-hidden bg-white px-6 py-14 sm:py-16 lg:px-8">
    <div
      class="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
    <div
      class="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
    <div class="mx-auto max-w-2xl lg:max-w-4xl">
      <h2 class="text-3xl font-bold tracking-tight text-center sm:text-4xl text-primary">Welcome</h2>
      <figure class="mt-10">
        <blockquote class="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
          <p>
            “This is a special vite built vue project service tool set, which contains the dependency retrieval, static
            resource statistics and other functions, will give you must development assistance and problem positioning
            analysis, such as in the use of the process to find the problem, please do not declare, it will not be
            solved.”
          </p>
        </blockquote>
      </figure>
    </div>
    <div class="mt-6 border-t border-gray-100" v-if="packageInfo">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-bold leading-6 text-gray-900">Name</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 font-bold">{{ packageInfo.name }}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-bold leading-6 text-gray-900">Version</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ packageInfo.version }}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-bold leading-6 text-gray-900">Author</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ packageInfo.author }}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-bold leading-6 text-gray-900">Description</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ packageInfo.description }}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-bold leading-6 text-gray-900">About</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui
            ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
            pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-bold leading-6 text-gray-900">Dependencies</dt>
          <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
              <li
                class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                v-for="(value, key, index) in packageInfo.dependencies"
                :key="index">
                <div class="flex w-0 flex-1 items-center">
                  <div class="flex min-w-0 flex-1 gap-2">
                    <span class="truncate font-bold">{{ key }}</span>
                  </div>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <a href="#" class="font-medium text-indigo-600">{{ value }}</a>
                </div>
              </li>
            </ul>
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-bold leading-6 text-gray-900">DevDependencies</dt>
          <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
              <li
                class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                v-for="(value, key, index) in packageInfo.devDependencies"
                :key="index">
                <div class="flex w-0 flex-1 items-center">
                  <div class="flex min-w-0 flex-1 gap-2">
                    <span class="truncate font-bold">{{ key }}</span>
                  </div>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <a href="#" class="font-medium text-indigo-600">{{ value }}</a>
                </div>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
