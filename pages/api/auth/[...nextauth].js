import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                emailnim: {label: 'Email/NIM', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials){
                if (!credentials) throw new Error('No credentials') {
                    const {emailnim: identifier, password} = credentials;
                    const result = await login({identifier, password,})
                    if (result) {
                        return{
                            id: result.user.id,
                            emailnim: result.user.emailnim,
                            role: result.user.is_admin ? 'admin' : 'user',
                        }
                    } else {
                        throw new Error('Credentials not found')
                    }
                }
            }
        })
    ]
})