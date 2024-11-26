import { useQuery } from '@tanstack/vue-query'
import type { UseQueryReturnType } from '@tanstack/vue-query'
import { fetchPosts, fetchPostComments } from './post.api'
import type { Post } from './post-list/post-list.types'

export function useFetchPosts(staleTime: number = 0): UseQueryReturnType<Post[], Error> {
  return useQuery({
    queryKey: ['fetch-posts'],
    queryFn: () => fetchPosts(),
    staleTime,
  })
}

export function useFetchComments(postId: number, staleTime: number = 0) {
  return useQuery({
    queryKey: ['fetch-comments', postId],
    queryFn: () => fetchPostComments(postId),
    staleTime,
  })
}
