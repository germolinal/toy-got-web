'use client'
import MessagesBox from '@/components/Messages'
import TextInput from '@/components/TextInput'
import Toolbar from '@/components/Toolbar'
import styles from './page.module.css'
import { useEffect, useState } from 'react'

export type Origin = 'user' | 'bot'
export type Message = {
  origin: Origin
  msg: string
}

export type Session = {
  id: string
  name: string
}

export default function Home () {
  const [msgs, setMsgs] = useState<Message[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [currentSession, setCurrentSession] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/sessions').then(async r => {
      if (!r.ok) {
        throw new Error('failed!')
      }
      let data = await r.json()
      let ret: Session[] = []
      data.forEach((id: string, i: number) => {
        ret.push({
          id,
          name: `Session ${i}`
        })
      })
      setSessions(ret)
    })
  }, [])

  const newSession = (): string => {
    let id = `${sessions.length}`
    let name = `Session ${id}`
    const s: Session = {
      id,
      name
    }
    setSessions(prevSessions => [...prevSessions, s])
    console.log('created session', id)
    return id
  }

  const selectSession = async (id: string) => {
    setCurrentSession(id)
    let r = await fetch(`http://127.0.0.1:5000/chat/${id}`)
    if (!r.ok) {
      throw new Error('Could not get messages')
    }
    let msgs = await r.json()    
    setMsgs(msgs.map((m:[string,string])=>{
      return {
        origin:m[0], msg: m[1]
      }
    }))
  }

  const appendMsg = (m: Message) => {
    setMsgs(prevMsgs => [...prevMsgs, m])
  }

  return (
    <main className={styles.main}>
      <div className={styles.toolbar}>
        <Toolbar
          sessions={sessions}
          setSessions={setSessions}
          selectSession={selectSession}
          newSession={newSession}
        />
      </div>
      <div className={styles.chat}>
        <MessagesBox
          newSession={newSession}
          msgs={msgs}
          appendMsg={appendMsg}
          currentSession={currentSession!}
        />
        <TextInput
          appendMsg={appendMsg}
          currentSession={currentSession!}
          newSession={newSession}
        />
      </div>
    </main>
  )
}
