'use client'

import { Button } from '@/components/ui/button'
import { Id } from '../../../convex/_generated/dataModel'
import { CableIcon, CopyIcon, Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useRouter } from 'next/navigation'

export default function InviteLink({
  coupleId,
  userId
}: {
  coupleId?: Id<'couples'>
  userId: string
}) {
  const [token, setToken] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const connectCoupleMutation = useMutation(api.couple.mutations.connect)

  const handleCoupleConnection = async () => {
    if (token === coupleId) {
      toast({
        title: 'You cannot be connected with yourself',
        variant: 'destructive'
      })
      return setToken('')
    }
    try {
      setIsLoading(true)
      await connectCoupleMutation({ coupleId: token as Id<'couples'>, userId })
      router.push('/transactions')
    } catch (error) {
      console.log(error)
      toast({
        title: 'Something went wrong while connecting you to your couple',
        description: 'Please try again in few',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }
  if (!coupleId) return null
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span>Couple Token to share with your partner</span>
        <div className="border border-input p-2 rounded-md bg-input text-black/20 select-none">
          {coupleId}
        </div>
        <Button
          size="sm"
          variant="outline"
          type="button"
          onClick={() => {
            window.navigator.clipboard.writeText(coupleId)
            toast({ title: 'Invite Link is copied' })
          }}
        >
          <CopyIcon className="w-4 h-4" />
        </Button>
      </div>
      <Separator />
      <div className="flex items-center gap-2">
        <Input
          placeholder="Past you Couple token here"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <Button
          size="sm"
          variant="outline"
          type="button"
          onClick={handleCoupleConnection}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <CableIcon className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
