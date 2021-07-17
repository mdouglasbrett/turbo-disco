self.addEventListener("message", handleWorkerMessage);

function handleWorkerMessage(message) {
  var { data } = message;
  switch (data.command) {
    case "createToDo":
      // TODO: dexie stuff...
      //  Success case, TODO: error case to follow
      self.postMessage({
        command: "confirmToDo",
        payload: `Here's what you wanted me to create ${JSON.stringify(
          data.payload
        )}`,
      });
      break;
    default:
      break;
  }
}
