chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "download") {
      const videoURL = message.url;
      fetch("http://localhost:8000/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoURL })
      }).then(res => console.log("Sent to backend"));
    }
  });
  