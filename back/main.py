
from flask import Flask, request, jsonify
from http import HTTPStatus
from llm import talk, get_sessions, get_messages
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={"*":{"origins":"http://localhost:3000"}})

@app.route("/hello")
@app.route('/hello/<name>')
def hello_world(name = None):
    return "Hi!"

@app.route("/sessions")
def sessions():
    return get_sessions()


@app.route("/chat/<session>", methods=["GET"])
def messages(session):
    return get_messages(session)

@app.route("/chat", methods=["POST"])
def chat():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        data = request.json        
        if not "msg" in data:
            return jsonify({"error":"msg is required"}), HTTPStatus.BAD_REQUEST
        if not "session" in data:
            return jsonify({"error":"session is required"}), HTTPStatus.BAD_REQUEST
        msg = data["msg"]
        id = data["session"]                
        print(id, type(id))
        llm_msg = talk(msg, id)
        
        return jsonify({"msg":llm_msg})
    else:
        return 'Content-Type not supported!', HTTPStatus.BAD_REQUEST



if __name__ == "__main__":
    app.run()