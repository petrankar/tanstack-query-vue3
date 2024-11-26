<template>
  <div class="post-details">
    <div class="top">
      <h1>Post {{ route.params.id }} Comments</h1>
      <button @click="router.go(-1)">BACK</button>
    </div>
    <div>isStale: {{ isStale }}</div>
    <span v-if="isPending">Loading...</span>
    <span v-else-if="isError">Error: {{ error.message }}</span>
    <div v-else-if="comments.length" class="comments">
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <h3 class="comment-id">Comment {{ comment.id }}</h3>
        <h3>{{ comment.name }}</h3>
        <p>{{ comment.body }}</p>
        <p>{{ comment.email }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetchComments } from './post.queries'

const route = useRoute()
const router = useRouter()

console.log(route.params.id)

const {
  isPending,
  isError,
  isFetching,
  data: comments,
  error,
  isStale,
} = useFetchComments(route.params.id, 10 * 1000)

watch(
  () => route.params,
  () => {
    console.log('watch: ', route.params.id)
  },
)
</script>

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    padding: 0.5rem;
  }
}
.comments {
  max-width: 600px;
  .comment {
    margin-top: 1rem;
    padding: 1rem;
    border-bottom: 1px solid grey;

    .comment-id {
      text-align: right;
    }
  }
}
</style>
