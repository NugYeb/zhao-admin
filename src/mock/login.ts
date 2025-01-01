interface User {
  id: number
  username: string
  password: string
  role: string
}

const users: User[] = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'user1', password: 'user123', role: 'user' },
  { id: 3, username: 'user2', password: 'user123', role: 'user' },
  { id: 4, username: 'manager', password: 'manager123', role: 'manager' },
]

export default [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }: { body: { username: string; password: string } }) => {
      const { username, password } = body
      const user = users.find(
        (u) => u.username === username && u.password === password,
      )
      if (user) {
        return {
          code: 200,
          message: 'Login successful',
          data: user,
        }
      } else {
        return {
          code: 401,
          message: 'Invalid username or password',
        }
      }
    },
  },
]
