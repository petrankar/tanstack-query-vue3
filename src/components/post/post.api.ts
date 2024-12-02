import type { Post, Comment } from './post.types'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts`)
  if (!response.ok) throw new Error('Failed to fetch post list')
  return response.json()
}

async function fetchPost(id: number): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts/${id}`)
  if (!response.ok) throw new Error('Failed to fetch post with id = ' + id)
  return response.json()
}

async function putPost(data: Post): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
  if (!response.ok) throw new Error('Failed to update post with id = ' + data.id)

  return response.json()
}

async function fetchComments(postId: number): Promise<Comment[]> {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`)
  if (!response.ok) throw new Error('Failed to fetch post comments with id = ' + postId)
  return response.json()
}

export { fetchPosts, fetchPost, putPost, fetchComments }
