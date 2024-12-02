import { useQuery, useMutation } from '@tanstack/vue-query'
import { fetchPosts, fetchPost, putPost, fetchComments } from './post.api'
import type { Post } from './post.types'
import type { UseQueryReturnType } from '@tanstack/vue-query'

function requestPosts(staleTime: number = 0): UseQueryReturnType<Post[], Error> {
  return useQuery({
    queryKey: ['fetch-posts'],
    queryFn: () => fetchPosts(),
    staleTime,
  })
}
function requestPost(id: number, staleTime: number = 0): UseQueryReturnType<Post[], Error> {
  return useQuery({
    queryKey: ['fetch-post', id],
    queryFn: () => fetchPost(id),
    staleTime,
  })
}

function updatePost() {
  return useMutation({
    mutationFn: (data: Post) => putPost(data),
  })
}

function requestComments(postId: number, staleTime: number = 0) {
  return useQuery({
    queryKey: ['fetch-comments', postId],
    queryFn: () => fetchComments(postId),
    staleTime,
  })
}

export { requestPosts, requestPost, updatePost, requestComments }
