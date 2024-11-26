<template>
  <div class="post-list-page">
    <div class="header">
      <h1>Posts</h1>
      <div>{{ dataUpdatedAt }} - {{ isStale }}</div>
    </div>
    <span v-if="isPending">Loading...</span>
    <span v-else-if="isError">Error: {{ error.message }}</span>
    <ul v-else-if="postList?.length">
      <li
        v-for="post in postList"
        :key="post.id"
        class="post"
        @click="router.push({ name: 'postDetails', params: { id: post.id } })"
      >
        <h2>{{ post.id }} - {{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <p class="user">User: {{ post.userId }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFetchPosts } from '../post.queries'
import { onMounted, onUnmounted } from 'vue'

const router = useRouter()

const {
  data: postList,
  isPending,
  isError,
  isFetching,
  dataUpdatedAt,
  isStale,
} = useFetchPosts(0 * 1000)

onMounted(() => {
  console.log('onMounted')
})

onUnmounted(() => {
  console.log('onUnmounted')
})
</script>

<style scoped>
.post-list-page {
  padding: 0 1rem;
  /* overflow-y: hidden; */
  background-color: var(--color-background-soft);
  .header {
    top: 75px;
    position: sticky;
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: inherit;
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .post {
    max-width: 600px;
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
}
</style>
