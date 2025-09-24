

# TaskMaster API

TaskMaster is a modern task management application that allows users to create, read, update and delete tasks. The application is built using Node.js, Express.js and MongoDB , Nextjs.

## Endpoints

### GET /tasks

Retrieve all tasks for the logged in user.

### POST /tasks

Create a new task for the logged in user.

### GET /tasks/:id

Retrieve a single task by its ID.

### PUT /tasks/:id

Update a single task by its ID.

### DELETE /tasks/:id

Delete a single task by its ID.

## Running the Project

To run the project, follow these steps:

1. Install Node.js and MongoDB on your machine.
2. Clone the repository using `git clone https://github.com/username/taskmaster-api.git`.
3. Navigate to the project directory using `cd taskmaster-api`.
4. Install the dependencies using `npm install`.
5. Start the MongoDB server using `mongod`.
6. Start the application server using `npm run dev`.
7. Open a web browser and navigate to `http://localhost:5000` to use the application.
8. frontend run - `npm run dev`

8. Use a tool like Postman or cURL to test the API endpoints.


## Request Headers

- `Authorization`: Bearer token for the logged in user.

## Response Format

The API returns data in JSON format. The response will always contain the following fields:

- `status`: The status of the response, either `success` or `error`.
- `data`: The data returned by the request, or an error message if the request was unsuccessful.
- `message`: A human-readable message describing the response.


