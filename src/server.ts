const app = require("./app");

const port: number | string = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`⚡Server running on port ${port}❄️`);
});
