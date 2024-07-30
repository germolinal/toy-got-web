export async function sendMsg(
    msg: string,
    session: string | null,
    appendMsg: any,
    newSession: ()=>string,
) {
    let txt = msg.trim()
    if (txt.length === 0) {
        console.warn("trying to send empty msg")
        return
    }

    if(!session){
        session = newSession()
    }

    appendMsg({
        origin: 'user',
        msg: txt
    })
    let r = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        body: JSON.stringify({
            msg: txt,
            session,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!r.ok) {
        throw new Error(JSON.parse(`got status ${r.status}`))
    }
    let data: { msg: string } = await r.json()

    appendMsg({
        origin: 'bot',
        msg: data.msg
    })
}