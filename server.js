const app = require("./src/app");

const PORT = 3000;

const server = app.listen(3000, () => {
  console.log(`WSV eCommerce start on port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log(`Exit Server Express`);
  });
});
