'use client'
import { User } from '@clerk/nextjs/server'
import { api } from '../../../convex/_generated/api'
import InviteLink from './invite-link'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import { useQuery } from 'convex/react'
import { Id } from '../../../convex/_generated/dataModel'
import SkeletonWrapper from '@/components/ui/skeleton-wrapper'

export default function Greeting({
  userId,
  firstName,
  partnerName
}: {
  userId: string
  firstName: string
  partnerName?: string
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [partnerId, setPartnerId] = useState<string>()
  const [coupleId, setCoupleId] = useState<Id<'couples'>>()
  const currentInfo = useQuery(api.user.current, { userId })

  useEffect(() => {
    setIsLoading(true)
    if (currentInfo) {
      setCoupleId(currentInfo.couple._id)
      setPartnerId(currentInfo.partnerUserId)
    }
    setIsLoading(false)
  }, [currentInfo])

  return (
    <SkeletonWrapper isLoading={isLoading}>
      <div className="space-y-2">
        <p className="text-3xl font-bold">Hello, {firstName}! 👋</p>
        <Separator />
        {partnerName ? (
          <p className="text-3xl font-bold">Partner with: {partnerName}</p>
        ) : (
          <InviteLink coupleId={coupleId} userId={userId} />
        )}
      </div>
    </SkeletonWrapper>
  )
}
