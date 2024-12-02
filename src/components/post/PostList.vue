<template>
  <main>
    <section class="top-header custom-header">
      <h1>Posts</h1>
      <StatusBadge :is-stale="isStale" :is-fetching="isFetching" />
      <button @click="refetch()" :disabled="isFetching && !isStale">Refetch Posts</button>
      <span class="last-update">Last Update: {{ dataUpdatedAtFormatted }}</span>
    </section>
    <section class="content">
      <h2 v-if="isFetching" class="loading">Fetching...</h2>

      <h2 v-else-if="isError">
        <span>Error {{ isError }}</span>
        Error: {{ isError }}
      </h2>
      <ul v-else-if="postList?.length">
        <li
          v-for="post in postList"
          :key="post.id"
          class="post"
          @click="routeTo('postDetails', { id: post.id })"
        >
          <h2>{{ post.id }} - {{ post.title }}</h2>
          <p>{{ post.body }}</p>
          <p class="user">User: {{ post.userId }}</p>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { requestPosts } from './post.queries'
import { computed } from 'vue'
import { StatusBadge } from '@/components'

const router = useRouter()

const {
  data: postList,
  dataUpdatedAt,
  isError,
  isFetching,
  isStale,
  refetch,
} = requestPosts(5 * 1000)

const dataUpdatedAtFormatted = computed(() => {
  const newDate = new Date(dataUpdatedAt.value)
  return newDate.toLocaleTimeString()
})

function routeTo(name: string, params: { id: number }) {
  router.push({ name, params })
}
</script>

<style scoped>
.custom-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;

  button {
    background-color: rgb(212, 212, 212);
    height: 2.3rem;
    border-radius: 4px;
  }

  .last-update {
    margin-left: auto;
  }
}

.content {
  display: flex;
  flex-direction: column;
  .loading {
    align-self: center;
  }
}

.post {
  max-width: 680px;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid grey;

  .user {
    padding: 0.5rem;
    text-align: right;
  }
}

.post:hover {
  cursor: pointer;
  opacity: 0.7;
}

ul {
  padding: 0;
  li {
    list-style-type: none;
  }
}
</style>
