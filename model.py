import os
from langchain_groq import ChatGroq
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from typing import Annotated
from typing_extensions import TypedDict
from dotenv import load_dotenv


# Get API keys
load_dotenv()
# Set environment variables
groq_api = os.getenv("GROQ_API_KEY")

llm_model = ChatGroq(groq_api_key=groq_api, model_name="Gemma2-9b-It")


# Define the chatbot state and graph
class State(TypedDict):
    message: Annotated[list, add_messages]


graph_builder = StateGraph(State)


def ChatBot(state: State):
    return {"message": llm_model.invoke(state["message"])}


graph_builder.add_node("chatbot", ChatBot)
graph_builder.add_edge(START, "chatbot")
graph_builder.add_edge("chatbot", END)
agent = graph_builder.compile()
# print(agent)
while True:
    user_input = input("user:")

    if user_input.lower() in ["quit", "exit"]:
        print("bye!")
        break

    for event in agent.stream({"message": ("user", user_input)}):
        # print(event.values())
        for value in event.values():
            # print(value["message"])
            ("Assistent:", value["message"].content)
