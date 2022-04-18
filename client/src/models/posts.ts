import { defineStore } from 'pinia'
import { api } from './myFetch';
import { User } from './user';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const usePosts = defineStore('posts', {
  
    state: () => ({
        list: [] as Post[],
    }),
    actions: {
        async fetchPosts() {
            const posts = await api('posts');
            this.list = posts.data;
        }
    }
})

export interface Post {
    _id: string;
    src: string;
    caption: string;
    owner: string;
    user: User;
    likes: string[];
    comments: any[];
    isPublic: boolean;
}