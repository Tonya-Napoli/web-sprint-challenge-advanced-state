# Sprint Challenge: Advanced React

In this challenge, you will write the logic for [THIS APP](https://advanced-state-wheel.herokuapp.com/).

## Tools

- Node 16.x
- NPM 8.x (update NPM executing `npm i -g npm`)
- Unix-like shell (Gitbash/bash/zsh)
- Chrome >= 98.x

Other configurations might work but haven't been tested.

## Project Setup

- Fork, clone, and `npm install`. You won't need to add any extra libraries.
- Launch the project in a development server executing `npm run dev`.
- Visit your app by navigating Chrome to `http://localhost:3000`.
- Run tests locally executing `npm test`. The local test file is `codegrade_mvp.test.js`.

## Studying the prototype

Open the live prototype linked above and study its functionality using the following **Chrome Dev Tools**:

- **Elements tab** shows the exact DOM rendered as we interact with the UI. Look at texts but also at class names.
- **Network tab** shows the HTTP messages. "Payload" shows the request payload from the client (if any) and "Preview" shows the payload from the server.
- **Redux Extension tab** shows application state, as well as the actions that fire on user interaction. These actions commonly carry payloads but not always.

### Things "Product" consider noteworthy

- The routes **don't lose their state** by navigating the links back and forth:
  - Current position of the "B" in the wheel is maintained.
  - Current quiz question stays loaded.
  - Values inside the form are kept.
- The endpoint to fetch the next quiz is rather slow, and a "Loading next quiz" shows instead of the quiz **while it arrives**.
- A next quiz is only requested if there is **no quiz already in app state**, or by submitting an answer.
- The "Submit answer" button in the quiz stays disabled until **an answer is selected**.
- Once an answer is selected, the only way to unselect it is by **selecting the other answer**.
- The "Submit new quiz" button in the form stays disabled untill **all** inputs have values such that `value.trim().length > 0`.
- Submitting a new quiz successfully **adds it to the roster** of questions that arrive from the `GET /quiz/next` endpoint below.

## Studying the API

The endpoints needed for this project are the following. **Explore them** with [Postman](https://www.postman.com/downloads/)) before starting work:

- `[GET] http://localhost:9000/api/quiz/next`
  - A response to a proper request includes `200 OK` and the next quiz object
- `[POST] http://localhost:9000/api/quiz/new`
  - Expects a payload with the following properties: `question_text`, `true_answer_text`, `false_answer_text`
  - Example of payload: `{ "question_text": "Love JS?", "true_answer_text": "yes", "false_answer_text": "nah" }`
  - A response to a proper request includes `201 Created` and the newly created quiz object
  - A malformed client payload will result in a `422 Unprocessable Entity` reponse with a reason
- `[POST] http://localhost:9000/api/quiz/answer`
  - expects a payload with the following properties: `quiz_id`, `answer_id`
  - example of payload: `{ "quiz_id": "LVqUh", "answer_id": "0VEv0" }`
  - A response to a proper request includes `200 OK` and feedback on the answer

Test all these endpoints with Postman before starting work with the project.

## MVP

Detailed explanation

## MVP Short Explanation

Make **ALL** the tests pass!

### Stretch Goals

- Stretch 1

### Important Notes

- Design the state of the app before opening your editor. You might need fewer pieces of state than you think!
- Booleans can be represented as 1/0, true/false, "on"/"off". In similar way, many types of data structures could represent the grid.
- Try to find the simplest data structure that describes effectively the state of the grid at any point in time.
- If the state that drives the grid is simple, it will be easier to update it as the user moves around.
- "Product" works hard designing the messages: we must reproduce them faithfully, down to the last comma.
- If you start with Functional, don't switch to Class-Based until Functional is passing all its tests (and vice versa).
- If the direction of the `y` axis surprises you, know that elements in HTML also have their origin of coordinates on their top-left corner.
