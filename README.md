 
# Express CSV Generator

This project is an Express.js server that integrates data from three different API endpoints, extracts specific key values from their responses, writes these values into a CSV file, and returns the path to the generated CSV file.

## Features

- Integrates with three APIs:
  - `https://jsonplaceholder.typicode.com/users`
  - `https://jsonplaceholder.typicode.com/posts`
  - `https://jsonplaceholder.typicode.com/comments`
- Extracts the following key values:
  - From Users API: `name`
  - From Posts API: `title`
  - From Comments API: `body`
- Combines the extracted values into a CSV file with headers: `name`, `title`, `body`
- Provides the path to the generated CSV file in the response

### Installing & Running

#### Clone this repo into your local: 
	
```
git clone https://github.com/AmarDalvi/CSV-generator.git
```

#### Start the server
	
```
node server.js
```
#### Test the URL
	
    1. http://localhost:3000/generate-csv

   - Navigate to above url in your browser or use a tool like Postman to make a GET request to the endpoint.
   - The response will contain the path to the generated CSV file.


