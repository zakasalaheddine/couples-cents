import { currentUser } from "@clerk/nextjs/server"
import { fetchMutation, fetchQuery } from "convex/nextjs"
import { redirect } from "next/navigation"
import { api } from "../../../convex/_generated/api"

export const initiateCouple = async () => {
  const user = await currentUser()
  if (!user) return redirect('/sign-in')

  let convexUser = await fetchQuery(api.user.getUser, { userId: user.id })

  if (!convexUser) {
    convexUser = await fetchMutation(api.user.createUser, {
      userId: user.id,
      email: user.emailAddresses[0].emailAddress
    })
  }
  if (convexUser) {
    const couple = await fetchQuery(api.couple.queries.getCouple, {
      userId: convexUser._id
    })
    if (!couple) {
      await fetchMutation(api.couple.mutations.createCouple, { partner: convexUser._id })
    }
  }
}