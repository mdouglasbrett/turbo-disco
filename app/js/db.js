self.addEventListener("message", handleWorkerMessage);

function handleWorkerMessage(message) {
  var { data } = message;
  switch (data.type) {
    case "createToDo":
      self.postMessage({
        command: "createToDo",
        payload: `Here's what you want me to create: ${data.payload}`,
      });
      break;
    default:
      break;
  }
}
