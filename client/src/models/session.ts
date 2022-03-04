import router from "../router";

const session = {
    user: null as any,
}

export async function Login(userName:string, password: string) {
    session.user = { userName, password };
    router.push('/messages');
}

export default session;