import { api } from './client';

// Types
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Issue {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved';
  location: string;
  createdAt: string;
  imageUrl?: string;
}

// User services
export const userService = {
  getUsers: () => api.get<User[]>('/users'),
  getUser: (id: number) => api.get<User>(`/users/${id}`),
  createUser: (userData: Partial<User>) => api.post<User>('/users', userData),
  updateUser: (id: number, userData: Partial<User>) => api.put<User>(`/users/${id}`, userData),
  deleteUser: (id: number) => api.delete(`/users/${id}`),
};

// Posts services (for demo purposes)
export const postService = {
  getPosts: () => api.get<Post[]>('/posts'),
  getPost: (id: number) => api.get<Post>(`/posts/${id}`),
  createPost: (postData: Partial<Post>) => api.post<Post>('/posts', postData),
  updatePost: (id: number, postData: Partial<Post>) => api.put<Post>(`/posts/${id}`, postData),
  deletePost: (id: number) => api.delete(`/posts/${id}`),
};

// Issue services (mock implementation)
export const issueService = {
  getIssues: () => {
    // Mock data for issues
    const mockIssues: Issue[] = [
      {
        id: 1,
        userId: 1,
        title: 'Street Light Not Working',
        description: 'The street light on Main Street has been out for 3 days',
        category: 'infrastructure',
        status: 'pending',
        location: 'Main Street, Block 5',
        createdAt: '2024-01-15T10:30:00Z',
      },
      {
        id: 2,
        userId: 1,
        title: 'Pothole on Highway',
        description: 'Large pothole causing traffic issues',
        category: 'roads',
        status: 'in-progress',
        location: 'Highway 101, Mile 23',
        createdAt: '2024-01-14T14:20:00Z',
      },
      {
        id: 3,
        userId: 1,
        title: 'Garbage Collection Missed',
        description: 'Weekly garbage collection was missed in our area',
        category: 'sanitation',
        status: 'resolved',
        location: 'Oak Avenue, Sector 12',
        createdAt: '2024-01-13T08:15:00Z',
      },
    ];
    
    return Promise.resolve({ data: mockIssues });
  },
  
  createIssue: (issueData: Partial<Issue>) => {
    const newIssue: Issue = {
      id: Date.now(),
      userId: 1,
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...issueData as Issue,
    };
    return Promise.resolve({ data: newIssue });
  },
  
  updateIssueStatus: (id: number, status: Issue['status']) => {
    return Promise.resolve({ data: { id, status } });
  },
};