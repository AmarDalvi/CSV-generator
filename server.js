//importing necessary modules
const express = require("express");
const axios = require("axios");
const { createObjectCsvWriter } = require("csv-writer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/generate-csv", async (req, res) => {
    //try-catch block for error handling
  try {
    
    const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
      axios.get("https://jsonplaceholder.typicode.com/users"),
      axios.get("https://jsonplaceholder.typicode.com/posts"),
      axios.get("https://jsonplaceholder.typicode.com/comments"),
    ]);

    const users = usersResponse.data;
    const posts = postsResponse.data;
    const comments = commentsResponse.data;

    //Extract Data and Combine into CSV Format
    const csvData = users.map((user) => {
      const post = posts.find((post) => post.userId === user.id) || {};
      const comment =
        comments.find((comment) => comment.postId === user.id) || {};

      return {
        name: user.name || "",
        title: post.title || "",
        body: comment.body || "",
      };
    });

    //Generate CSV File
    const csvWriter = createObjectCsvWriter({
      path: path.join(__dirname, "output.csv"),
      header: [
        { id: "name", title: "Name" },
        { id: "title", title: "Title" },
        { id: "body", title: "Body" },
      ],
    });

    await csvWriter.writeRecords(csvData);

    //path to the generated CSV file
    res.json({ path: path.join(__dirname, "output.csv") });
  } catch (error) {
    //Error Handling
    console.error("Error generating CSV:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the CSV file." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
