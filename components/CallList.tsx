'use client'
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard'
import Loader from './Loader'
import { useToast } from './ui/use-toast'

type CallListProps = {
    type : "ended" | "upcoming" | "recordings"
}

export default function CallList({type}:CallListProps) {
    const {endedCalls, upcomingCalls, callRecordings, isLoading} = useGetCalls()
    const router = useRouter()
    const [recordings, setRecordings] = useState<CallRecording[]>([])
    const {toast} = useToast()
    const getCalls = ()=>{
        switch(type){
            case "ended" : 
                return endedCalls
            case "recordings" : 
                return recordings
            case "upcoming" :
                return upcomingCalls
            default :
                return []
        }
    }

    const getNoCallsMessage = ()=>{

        switch(type){
            case "ended" : 
                return "No previous calls"
            case "recordings" : 
                return "No recordings"
            case "upcoming" :
                return "No upcoming calls"
            default :
                return ""
        }
    }

    useEffect(()=>{
        const fetchRecordings = async ()=>{
            try {
                const callData = await Promise.all(callRecordings.map((meeting)=>meeting.queryRecordings()))
                const recordings = callData.filter(call=>call.recordings.length > 0).flatMap(call=>call.recordings)
                setRecordings(recordings)
            }
            catch(error){
                toast({title: "Try again later."})
            }
            
        }
        if(type === "recordings") fetchRecordings()
    }, [type, callRecordings,toast])

    const calls = getCalls()
    const noCallsMessage = getNoCallsMessage()

    if(isLoading) return <Loader />

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {calls && calls.length > 0 ? calls.map((meeting : Call | CallRecording, index: number)=>{
            if(meeting instanceof Call){
                if(type === "upcoming") {
                    return(
                        <MeetingCard 
                            key={meeting.id}
                            icon = "/icons/upcoming.svg"
                            title = {meeting.state.custom.description.substring(0,15)}
                            date ={meeting.state.startsAt?.toLocaleString()!}
                            isPreviousMeeting = {false}
                            handleClick = {()=>{router.push(`/meeting/${meeting.id}`)}}
                            link = {`${process.env.NEXT_PUBLIC_BASE_URL!}/meeting/${meeting.id}`}
                            buttonText = "Start"
                        />
                    )
                }
                else {
                    return(
                        <MeetingCard 
                            key={meeting.id}
                            icon = "/icons/previous.svg"
                            title = {meeting.state?.custom?.description}
                            date ={meeting.state.startsAt?.toLocaleString()!}
                            isPreviousMeeting = {true}
                            handleClick = {()=>{router.push(`/meeting/${meeting.id}`)}}
                            link = {`${process.env.NEXT_PUBLIC_BASE_URL!}/meeting/${meeting.id}`}
                            buttonText = "Start"
                        />
                    )
                }
                
            }
            else {
                
                return(
                    <MeetingCard 
                        key={`${meeting.filename}%%${index}`}
                        icon = {type === "ended"? "/icons/previous.svg": type === "upcoming" ? "/icons/upcoming.svg" : "/icons/recordings.svg"}
                        title = {meeting.filename.substring(0,20)}
                        date ={meeting.start_time}
                        isPreviousMeeting = {false}
                        buttonIcon1 = "/icons/play.svg"
                        handleClick = {()=>{router.push(`${meeting.url}`)}}
                        link = {meeting.url}
                        buttonText = "Play"
                    />
                )
            }
        }): (<h1>{noCallsMessage}</h1>)} 
    </div>
  )
}
