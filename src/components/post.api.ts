import type { Post } from './post-list/post-list.types'

export async function fetchPosts(): Promise<Post[]> {
  return await fetch('https://jsonplaceholder.typicode.com/posts').then((response) =>
    response.json(),
  )
}

export async function fetchPost(id: number): Promise<Post> {
  return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((response) =>
    response.json(),
  )
}

export async function fetchPostComments(postId: number): Promise<Post[]> {
  return await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then(
    (response) => response.json(),
  )
}
