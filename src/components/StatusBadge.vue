<template>
  <div :class="['status-badge', styleClass]">
    <span v-if="isFetching">Fetching...</span>
    <span v-else> {{ isStale ? 'Stale' : 'Fresh' }} Data </span>
  </div>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue'
const props = defineProps<{
  isStale: boolean
  isFetching: boolean
}>()

const { isStale, isFetching } = toRefs(props)

const styleClass = computed(() => {
  if (isFetching.value) {
    return 'fetching'
  } else if (isStale.value) {
    return 'stale'
  } else {
    return 'fresh'
  }
})
</script>

<style scoped>
.status-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
  padding: 4px;
  border: 1px solid grey;
  border-radius: 4px;
  min-width: 80px;

  text-wrap: nowrap;
}

.fresh {
  color: #6ce9a6;
  background-color: #054f31;
  border-color: #039855;
}
.stale {
  color: #fec84b;
  background-color: #7a2e0e;
  border-color: #dc6803;
}

.fetching {
  color: #84caff;
  background-color: #194185;
  border-color: #84caff;
}
</style>
