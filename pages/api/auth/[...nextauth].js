import GitHubProvider from "next-auth/providers/github";
import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import User from "../../../mongoose/User";
import dbConnect from "../../../utils/dbConnect";
export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt",
        maxAge: 2500,
    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                const { email, password } = credentials
                console.log(credentials)
                const user = await User.findOne({ email })
                if (user) {
                    console.log(user)
                    const isMAtch = await bcrypt.compare(password, user.password);
                    if (isMAtch) {
                        return user
                    }
                }
            }
        })
    ],
    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.uid;
                session.user.role = token.role
            }
            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.uid = user._id;
                token.role = user.role
            }
            return token;
        },
    },
     pages: {
    signIn: "/auth/login",
  },
    secret: process.env.NEXTAUTH_SECRET
}
export default NextAuth(authOptions)
