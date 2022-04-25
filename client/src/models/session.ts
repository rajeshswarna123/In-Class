import router from "../router";
import * as users from "../models/user";
import { api } from "./myFetch";
import { useMessages } from "./messages";
import { defineStore } from "pinia";


export const useSession = defineStore('session', {
    state: () => ({
        user: null as users.User | null,
        destinationUrl: null as string | null,
    }),
    actions: {
        async Login(email: string, password: string) {
        
        const messages =useMessages();
        try{
            const user = await api("users/login", { email, password });
            messages.notifications.push({
                type: "success",
                message: `Welcome ${user.firstName}`,
            })
            this.user = user;
            router.push('/messages'); 
        }
        catch(error: any){
            messages.notifications.push({
                type: "error",
                message: error.message,
            })
            console.table(messages.notifications);
        }
        
        },

        Logout() {
            this.user = null;
            router.push('/login');
        },

    
    },
})
