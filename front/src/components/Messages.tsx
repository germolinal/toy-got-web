'use client'
import styles from '../app/page.module.css'

import { Message } from '@/app/page'
import NoMessages from './NoMessages'

function UserMsg ({ msg }: { msg: string }) {
  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      <span style={{ flexGrow: 1 }}></span>
      <p
        style={{
          background: '#f4f4f4',
          width: 'fit-content',
          maxWidth: '500px',
          padding: '0.625rem 1.25rem',
          borderRadius: '1.5rem'
        }}
      >
        {msg}
      </p>
    </div>
  )
}

export default function MessagesBox ({
  msgs,
  appendMsg,
  currentSession,
  newSession
}: {
  msgs: Message[]
  appendMsg: any
  currentSession: string
  newSession: () => string
}) {
  return (
    <div id='msgs' className={styles.msgs}>
      {msgs.length !== 0 &&
        msgs.map((m: Message, i: number) => {
          if (m.origin === 'user') {
            return <UserMsg key={i} msg={m.msg} />
          } else {
            return <p key={i}>{m.msg}</p>
          }
        })}
      {msgs.length === 0 && (
        <NoMessages
          appendMsg={appendMsg}
          currentSession={currentSession}
          newSession={newSession}
        />
      )}
    </div>
  )
}
