'use client'
import styles from '../app/page.module.css'
import { useEffect, useState } from 'react'
import { sendMsg } from '@/utils/llm'

const prompts = [
  'What colour is the sun?',
  '42 is the answer to life, the universe and everything. Why?',
  'What can you help me with?',
  'What are the Big 4 companies?',
  'What is the currency of Japan?',
  'What is the fastest land animal?'
]

// get random prompts
function getPrompts (n: number): string[] {
  if (n > prompts.length) {
    n = prompts.length
  }
  let selected: string[] = []
  while (selected.length < n) {
    const i = Math.round(Math.random() * (prompts.length - 1))
    const p = prompts[i]
    if (!selected.includes(p)) {
      selected.push(p)
    }
  }
  return selected
}

export default function NoMessages ({
  appendMsg,
  currentSession,
  newSession
}: {
  appendMsg: any
  currentSession: string | null
  newSession: () => string
}) {
  const [randomPrompts, setPrompts] = useState<string[]>([])

  useEffect(() => {
    setPrompts(getPrompts(4))
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ul className={styles.promptlist}>
        {randomPrompts.map((p: string, i: number) => {
          return (
            <li
              key={i}
              onClick={() => {
                sendMsg(p, currentSession, appendMsg, newSession)
              }}
            >
              <span>{p}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
