import cloudbase from '@cloudbase/js-sdk'
import { CLOUDBASE_ENV_ID } from './config'

// 云开发环境初始化
const env = CLOUDBASE_ENV_ID

// 检查是否在浏览器环境中
const isBrowser = typeof window !== 'undefined'

// 尝试初始化 CloudBase
let app: any = null
let db: any = null
let storage: any = null
let auth: any = null

try {
  app = cloudbase.init({
    env,
    // 在浏览器环境中添加必要的配置
    ...(isBrowser && {
      region: 'ap-shanghai',
      timeout: 30000
    })
  })

  // 获取数据库实例
  db = app.database()

  // 获取存储实例
  storage = app.storage()

  // 获取认证实例
  auth = app.auth()
} catch (error) {
    console.error('CloudBase 初始化失败:', error)
    // 提供模拟数据，不管环境是什么
    console.log('使用模拟数据')
    
    // 模拟用户数据，包含管理员账号
    const mockUsers = [
      {
        _id: 'admin123',
        username: '管理员',
        email: '921973027@qq.com',
        password: 'As5508822', // 直接存储明文密码用于测试
        role: 'admin',
        status: 'active',
        created_at: new Date().toISOString()
      }
    ]
    
    // 模拟作品数据
    const mockWorks = [
      {
        _id: 'work1',
        title: '测试视频 1',
        description: '这是一个测试视频，用于展示作品功能',
        video_url: 'https://agent-cos.ai-tools.cn/cases/20260118-65d25db5-1e0a-4dd0-99cf-04d16f8f8c34.mp4',
        cover_image: 'https://via.placeholder.com/640x360',
        category: '短视频',
        tags: ['测试', '视频'],
        status: 'published',
        author_id: 'admin123',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        _id: 'work2',
        title: '测试视频 2',
        description: '这是另一个测试视频，用于展示作品功能',
        video_url: 'https://agent-cos.ai-tools.cn/cases/20260118-65d25db5-1e0a-4dd0-99cf-04d16f8f8c34.mp4',
        cover_image: 'https://via.placeholder.com/640x360',
        category: '短视频',
        tags: ['测试', '视频'],
        status: 'published',
        author_id: 'admin123',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
    
    // 模拟数据库实例
    db = {
      collection: (name: string) => {
        console.log('访问集合:', name)
        if (name === 'users') {
          return {
            where: (query: any) => {
              console.log('查询用户:', query)
              if (query.email) {
                const user = mockUsers.find(u => u.email === query.email)
                console.log('找到用户:', user)
                return {
                  get: () => {
                    console.log('返回用户数据:', user ? [user] : [])
                    return Promise.resolve({ data: user ? [user] : [] })
                  },
                  count: () => Promise.resolve({ total: user ? 1 : 0 })
                }
              }
              if (query._id) {
                const user = mockUsers.find(u => u._id === query._id)
                return {
                  get: () => Promise.resolve({ data: user ? [user] : [] })
                }
              }
              return {
                get: () => Promise.resolve({ data: mockUsers }),
                count: () => Promise.resolve({ total: mockUsers.length })
              }
            },
            add: (user: any) => {
              const newUser = {
                ...user,
                _id: `user${Date.now()}`,
                created_at: new Date().toISOString()
              }
              mockUsers.push(newUser)
              return Promise.resolve({ id: newUser._id })
            }
          }
        }
        if (name === 'works') {
          return {
            where: (query: any) => {
              console.log('查询作品:', query)
              let filteredWorks = [...mockWorks]
              if (query.category) {
                filteredWorks = filteredWorks.filter(w => w.category === query.category)
              }
              if (query.status) {
                filteredWorks = filteredWorks.filter(w => w.status === query.status)
              }
              if (query._id) {
                filteredWorks = filteredWorks.filter(w => w._id === query._id)
              }
              console.log('过滤后的作品:', filteredWorks)
              return {
                get: () => {
                  console.log('返回作品数据:', filteredWorks)
                  return Promise.resolve({ data: filteredWorks })
                },
                count: () => Promise.resolve({ total: filteredWorks.length }),
                add: (work: any) => {
                  const newWork = {
                    ...work,
                    _id: `work${Date.now()}`,
                    author_id: 'admin123',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                  }
                  mockWorks.push(newWork)
                  console.log('添加新作品:', newWork)
                  return Promise.resolve({ id: newWork._id })
                },
                update: (updateData: any) => {
                  console.log('更新作品:', query, updateData)
                  if (query._id) {
                    const workIndex = mockWorks.findIndex(w => w._id === query._id)
                    if (workIndex !== -1) {
                      mockWorks[workIndex] = {
                        ...mockWorks[workIndex],
                        ...updateData,
                        updated_at: new Date().toISOString()
                      }
                      console.log('更新后的作品:', mockWorks[workIndex])
                    }
                  } else {
                    // 如果没有 _id 参数，尝试根据其他条件更新
                    console.log('没有 _id 参数，无法更新作品')
                  }
                  return Promise.resolve({})
                },
                remove: () => {
                  console.log('删除作品:', query)
                  if (query._id) {
                    const workIndex = mockWorks.findIndex(w => w._id === query._id)
                    if (workIndex !== -1) {
                      mockWorks.splice(workIndex, 1)
                      console.log('删除后的作品列表:', mockWorks)
                    }
                  }
                  return Promise.resolve({})
                },
                orderBy: (field: string, order: string) => {
                  console.log('排序作品:', field, order)
                  return {
                    skip: (offset: number) => {
                      console.log('跳过作品:', offset)
                      return {
                        limit: (limit: number) => {
                          console.log('限制作品:', limit)
                          return {
                            get: () => {
                              let sortedWorks = [...filteredWorks]
                              if (field === 'created_at') {
                                sortedWorks.sort((a, b) => {
                                  return order === 'desc' 
                                    ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                                    : new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                                })
                              }
                              const paginatedWorks = sortedWorks.slice(offset, offset + limit)
                              console.log('返回分页作品:', paginatedWorks)
                              return Promise.resolve({ data: paginatedWorks })
                            }
                          }
                        }
                      }
                    }
                  }
                },
                count: () => {
                  console.log('作品总数:', filteredWorks.length)
                  return Promise.resolve({ total: filteredWorks.length })
                }
              }
            },
            orderBy: (field: string, order: string) => {
              console.log('排序作品:', field, order)
              return {
                skip: (offset: number) => {
                  console.log('跳过作品:', offset)
                  return {
                    limit: (limit: number) => {
                      console.log('限制作品:', limit)
                      return {
                        get: () => {
                          let sortedWorks = [...mockWorks]
                          if (field === 'created_at') {
                            sortedWorks.sort((a, b) => {
                              return order === 'desc' 
                                ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                                : new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                            })
                          }
                          const paginatedWorks = sortedWorks.slice(offset, offset + limit)
                          console.log('返回分页作品:', paginatedWorks)
                          return Promise.resolve({ data: paginatedWorks })
                        }
                      }
                    }
                  }
                }
              }
            },
            get: () => {
              console.log('返回所有作品:', mockWorks)
              return Promise.resolve({ data: mockWorks })
            },
            count: () => {
              console.log('作品总数:', mockWorks.length)
              return Promise.resolve({ total: mockWorks.length })
            },
            add: (work: any) => {
              const newWork = {
                ...work,
                _id: `work${Date.now()}`,
                author_id: 'admin123',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }
              mockWorks.push(newWork)
              console.log('添加新作品:', newWork)
              return Promise.resolve({ id: newWork._id })
            }
          }
        }
        return {
          where: () => ({
            get: () => Promise.resolve({ data: [] }),
            count: () => Promise.resolve({ total: 0 }),
            add: () => Promise.resolve({ id: 'mock-id' }),
            update: () => Promise.resolve({}),
            remove: () => Promise.resolve({})
          }),
          orderBy: () => ({
            skip: () => ({
              limit: () => ({
                get: () => Promise.resolve({ data: [] })
              })
            })
          }),
          get: () => Promise.resolve({ data: [] }),
          count: () => Promise.resolve({ total: 0 }),
          add: () => Promise.resolve({ id: 'mock-id' })
        }
      }
    }
    storage = {}
    auth = {}
  }

export { app, db, storage, auth }
export default app