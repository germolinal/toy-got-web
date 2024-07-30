'use client'

import { useState } from 'react'
import styles from '../app/page.module.css'

import { Message } from '@/app/page'
import { sendMsg } from '@/utils/llm'
export default function TextInput ({
  currentSession,
  appendMsg,
  newSession
}: {
  currentSession: string | null
  appendMsg: (m: Message) => void
  newSession: () => string
}) {
  const [msg, setMsg]: [string, any] = useState('')
  const [validMsg, setValidMsg]: [boolean, any] = useState(false)
  const clearMsg = (e: any) => {
    setMsg('')
    e.target.value = ''
    setValidMsg(false)
  }
  const send = async (e: any) => {
    if (!validMsg) {
      clearMsg(e)
      return
    }
    let txt = msg.trim()

    await sendMsg(txt, currentSession, appendMsg, newSession)

    clearMsg(e)
  }

  const updateMsg = (e: any) => {
    let txt = e.target.value.trim()
    setValidMsg(txt.length !== 0)
    setMsg(txt)
    if (e.key === 'Enter') {
      send(e).then(r => {
        console.log('done!')
      })
    }
  }

  return (
    <div id='msgbox' className={styles.msgbox}>
      <textarea
        onKeyUp={updateMsg}
        placeholder='Message ChatGPT (ish)'
        id='msg-box'
      ></textarea>
      <button id='send' disabled={!validMsg} onClick={send}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1em'
          height='1em'
          fill='none'
          viewBox='0 0 32 32'
        >
          <path
            fill='currentColor'
            fillRule='evenodd'
            d='M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z'
            clipRule='evenodd'
          ></path>
        </svg>
      </button>
    </div>
  )
}
