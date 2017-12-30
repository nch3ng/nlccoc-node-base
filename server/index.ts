import * as http from "http";

let server = require("./server");

const port = process.env.PORT || 3000;

let app = server.Server.bootstrap().app;

app.set("port", port);

let httpServer = http.createServer(app);
httpServer.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})