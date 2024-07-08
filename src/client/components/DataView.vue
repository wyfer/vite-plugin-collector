<script setup>
import useGraph from "@/composables/useGraph.js";

const { generateDotFile } = useGraph();

const props = defineProps({
  moduleInfo: {
    type: Object,
    required: true,
  },
  sourceKey: {
    type: String,
    required: true,
  },
});

const dotHtml = ref("");
onMounted(() => {
  const { moduleInfo, sourceKey } = props;

  let resolvies = [];

  if (sourceKey === "dependencies") {
    resolvies = moduleInfo[sourceKey].map(item => item.resolved);
  } else {
    resolvies = moduleInfo[sourceKey];
  }

  dotHtml.value = generateDotFile({
    sourcePath: moduleInfo.source,
    resolvies: resolvies,
  });
});
</script>

<template>
  <div class="w-full max-w-full h-[600px] bg-slate-300">
    <iframe :src="dotHtml" frameborder="0" class="w-full h-full"></iframe>
  </div>
</template>
