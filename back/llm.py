
import os
from langchain_openai import ChatOpenAI
os.environ["LANGCHAIN_TRACING_V2"] = "false"


from langchain_core.output_parsers import StrOutputParser


_SYSTEM_PROMPT = "You are a friendly assistant."
history = {}


def get_history(usr_msg, session_id):
    usr_msg = ("user", usr_msg)
    if not session_id in history:
        # initialize history
        history[session_id]=[
            ("system", _SYSTEM_PROMPT), 
            usr_msg
        ]
    else:
        # append new message
        history[session_id].append(usr_msg)
    msgs = history[session_id]
    return msgs[len(msgs)-10:]

model = ChatOpenAI(model="gpt-3.5-turbo")


parser = StrOutputParser()

chain =  model | parser


def talk(usr_msg, session_id):
    h = get_history(
        usr_msg=usr_msg, 
        session_id=session_id
    )
    res = chain.invoke(h)
    history[session_id].append(("bot", res))
    return res

def get_sessions():
    return [key for key in history.keys()]

def get_messages(session):
    if session in history:
        msgs = history[session]
        return msgs[1:] #remove system prompt
    else:
        return []
    