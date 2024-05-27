import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

import { db } from "./schema"
import { DrizzleAdapter } from "@auth/drizzle-adapter"


export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  adapter: DrizzleAdapter(db)
})