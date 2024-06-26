'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CallLayoutSelections } from "@/constants"

import { cn } from '@/lib/utils'
import { CallControls, CallParticipantListing, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import { LayoutList, Users } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useState } from 'react'
import EndCallButton from "./EndCallButton"
import Loader from "./Loader"

export default function MeetingRoom() {
    const searchParams = useSearchParams()
    const isPersonalRoom = !!searchParams.get('personal')
    const [layout, setLayout] = useState<typeof CallLayoutSelections[number]>('speaker-left')
    const [showParticipants, setShowParticipants] = useState(false)
    const {useCallCallingState} = useCallStateHooks()
    const callingState = useCallCallingState()
    const router = useRouter()

    if(callingState !== CallingState.JOINED) return <Loader />


    const CallLayout = ()=>{
        switch(layout){
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition={'left'} />
            default :
                return <SpeakerLayout participantsBarPosition={'right'} />
        }
    }
  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
        Meeting room
        <div className='relative flex size-full items-center justify-center'>
            <div className='flex size-full max-w-[1000px] items-center'>
                <CallLayout />
            </div>
            <div className={cn('h-[calc(100vh-86px)] hidden ml-2',{'show-block':showParticipants})}> 
                <CallParticipantsList onClose={()=>setShowParticipants(false)} />
            </div>
        </div>
        <div className='fixed bottom-0 flex w-full items-center flex-wrap justify-center gap-5'>
            <CallControls onLeave={()=>router.push('/')} />
            <DropdownMenu>
            <DropdownMenuTrigger><LayoutList className="text-white" /></DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    CallLayoutSelections.map((layout, index)=>{
                        return(
                            <div key={index}>
                                <DropdownMenuItem key={index} onClick={()=>setLayout(layout)}>{layout.charAt(0).toUpperCase()+layout.slice(1)}</DropdownMenuItem>
                                <DropdownMenuSeparator key={index}/>
                            </div>
                        )
                    })
                }
            </DropdownMenuContent>
            </DropdownMenu>
            <CallStatsButton />
            <button onClick={()=>setShowParticipants((prev)=>!prev)}>
                <div className="cursor-pointer rounded-2xl ">
                    <Users size={20} className="text-white"/>
                </div>
            </button>
            {!isPersonalRoom&&<EndCallButton />}
        </div>
    </section>
  )
}
