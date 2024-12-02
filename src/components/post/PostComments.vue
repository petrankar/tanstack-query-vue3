<template>
  <main>
    <section class="top-header custom-header">
      <h1>Post {{ route.params.id }} Comments</h1>
      <StatusBadge :is-stale="isStale" :is-fetching="isFetching" />
      <button @click="refetch()" :disabled="isFetching">Refetch Comments</button>
      <button @click="mutate(newPost)" :disabled="isFetching">
        Update Post {{ route.params.id }}
      </button>
      <div class="end">
        <span class="last-update">Last Update: {{ dataUpdatedAtFormatted }}</span>
        <button @click="router.go(-1)" class="back">BACK</button>
      </div>
    </section>
    <section class="content">
      <div v-if="isUpdateSuccess" class="update-data">
        {{ mutationData }}<br />
        INFO: according to jsonplaceholder guide resource will not be really updated on the server
        but it will be faked as if <br />
        So the postList wiil be not updated
      </div>
      <span v-if="isPending">Loading...</span>
      <span v-else-if="isError">Error: {{ error }}</span>
      <div v-else-if="comments?.length" class="comments">
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <h3 class="comment-id">Comment {{ comment.id }}</h3>
          <h3>{{ comment.name }}</h3>
          <p>{{ comment.body }}</p>
          <p>{{ comment.email }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { watch, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { requestComments, updatePost } from './post.queries'
import { StatusBadge } from '@/components'

const route = useRoute()
const router = useRouter()
const newPost = ref({
  body: 'Test UseMutation',
  id: Number(route.params.id),
  title: 'New title',
  userId: 2,
})

const {
  data: comments,
  error,
  dataUpdatedAt,
  isError,
  isFetching,
  isPending,
  isStale,
  refetch,
} = requestComments(Number(route.params.id), 5 * 1000)

const { mutate, isSuccess: isUpdateSuccess, data: mutationData } = updatePost()

const dataUpdatedAtFormatted = computed(() => {
  const newDate = new Date(dataUpdatedAt.value)
  return newDate.toLocaleTimeString()
})

watch(
  () => route.params,
  () => {
    console.log('watch: ', route.params.id)
  },
)
</script>

<style scoped>
.custom-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;

  .end {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  button {
    padding: 0.5rem;
  }
}

.content {
  display: flex;
  flex-direction: column;
  .loading {
    align-self: center;
  }

  .update-data {
    padding: 16px;
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
}
</style>
