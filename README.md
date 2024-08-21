# Chatbot Application

A simple chatbot application built with React and Flask, featuring a conversational interface with avatars and the ability to clear the chat history.

# Features

- Conversational chatbot interface
- Avatar images for user and bot messages
- Chat history persistence using local storage
- Clear chat functionality
- Responsive and styled UI

# Project Structure

src/
├── assets/
│ ├── user-avatar.png
│ └── bot-avatar.png
├── components/
│ └── Chatbot.js
└── App.js
public/
├── index.html
└── ...
backend/
├── app.py
└── requirements.txt


## Installation

### Frontend (React)

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Navigate to the `frontend` directory:**

    ```bash
    cd frontend
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Start the React development server:**

    ```bash
    npm start
    ```

### Backend (Flask)

1. **Navigate to the `backend` directory:**

    ```bash
    cd backend
    ```

2. **Create a virtual environment and activate it:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install backend dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Run the Flask server:**

    ```bash
    python app.py
    ```

## Configuration

Make sure to create a `.env` file in the `backend` directory with the following variables:

```plaintext
GROQ_API_KEY=your-groq-api-key
LANGSMITH_API_KEY=your-langsmith-api-key


