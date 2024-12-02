interface Post {
  body: string
  id: number
  title: string
  userId: number
}

interface Comment {
  body: string
  email: string
  id: number
  name: string
}

export type { Post, Comment }
