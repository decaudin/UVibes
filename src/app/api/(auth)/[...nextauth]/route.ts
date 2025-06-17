import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { JWT } from "next-auth/jwt";
import { User, Session } from "next-auth";

import clientPromise from "@/lib/mongoClient";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
        if (user) {
            token.userId = user.id;
        }
        return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            session.userId = token.userId;
            return session;
        },
    },
};

// @ts-expect-error: workaround temporaire pour erreur TS
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };