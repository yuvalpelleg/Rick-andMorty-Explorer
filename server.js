const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set

// Serve static files from the  directory
app.use(express.static(__dirname));

//route for the home page (index.html)
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "index.html"));
});

// // route for the about page (about.html)
// app.get("/about", (request, response) => {
//   response.send("about is mid...");
// });

// // route for the not found page (404)
// app.use((request, response) => {
//   response.sendFile(path.join(__dirname, "public", "notFound.html"));
// });

//start the server
app.listen(PORT, () => {
  console.log(`server listening at port:${PORT}`);
});
