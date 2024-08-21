from flask import Flask, request, jsonify
from model import agent
from flask_cors import CORS

# Initialize Flask
app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    user_message = str(request.json.get("message"))
    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    elif user_message in ['quit','eixt']:
        return jsonify({"bye!": ""})

    response = ""
    for event in agent.stream({"message": ("user", user_message)}):
        for value in event.values():
            print(value)
            response += value["message"].content

    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
