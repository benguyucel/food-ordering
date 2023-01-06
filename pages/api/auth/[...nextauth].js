import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../mongoose/User"
import bcrypt from 'bcryptjs'
dbConnect();
export const authOptions = {
    // adapter: MongoDBAdapter(clientPromise),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
        session: async ({ session, token, user }) => {
            session.accessToken = token.accessToken
            session.user.id = token.sub
            return session
        },
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 30,
        // You can define your own encode/decode functions for signing and encryption

    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                const email = credentials.email;
                const password = credentials.password;
                const user = await User.findOne({ email: email })
                if (!user) {
                    throw new Error("You haven't registered yet!");
                }
                if (user) {
                    return signInUser({ user, password });
                }
            }
        })
    ],
    secret: process.env.SECRET_JWT,
    pages: {
        signIn: "/auth/login",
    },
    cookies: {
        sessionToken: {
            name: `sessionToken`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
    },
    database: process.env.MONGO_URI,

}

const signInUser = async ({ user, password }) => {
    const isMAtch = await bcrypt.compare(password, user.password);
    if (!isMAtch) {
        throw new Error("Incorrect password!");
    }
    return user;
};

export default NextAuth(authOptions)

