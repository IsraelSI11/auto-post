# X Post Scheduler

An X post scheduler built with Next.js for the frontend and Python (using Flask) for the backend.

Includes the ability to generate tweet examples using AI powered by the `llama-3.2-1b-instruct` model.

---

## Demo

https://github.com/user-attachments/assets/f32eda5c-8ddf-4698-b39d-ed7dce12dfe3

---

## Installation & Development

### Launch the Web Client

```bash
cd frontend/
npm install
npm start
```

### Launch Backend

First, activate the Python virtual environment. Navigate to the backend/.env/bin folder and run the activation script appropriate for your operating system. Once the environment is activated, go to the backend/ directory and run the following command to start the server:

```bash
flask run
```

### (Optional) Launch LMStudio

For AI-powered tweet generation, I'm using LMStudio with the server option enabled. However, you can use other alternatives compatible with the `llama-3.2-1b-instruct` model or similar AI generation tools, as long as they provide an accessible API for integration.

## Environment Variables

### Frontend

- `API_URL` The URL of the backend server.
- `CLIENT_ID` The client ID for the X app.
- `CLIENT_SECRET` The client secret for the X app.
- `NEXT_PUBLIC_BASE_URL` The base URL of the Next.js application.

### Backend

- `SECRET_KEY` A secret key for configuration (can be any string).
- `LLAMA_API_URL` The URL of the Llama server.

## Authors

- [@IsraelSI11](https://www.github.com/IsraelSI11)

## License

[MIT](https://choosealicense.com/licenses/mit/)
