document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("downloadBtn");
  const statusText = document.getElementById("status");
  const urlInput = document.getElementById("urlInput");

  function setStatus(message, type = "info") {
    statusText.textContent = message;
    statusText.style.color = type === "error" ? "red" : "green";
  }

  // Get current active tab URL
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    if (currentTab && currentTab.url) {
      urlInput.value = currentTab.url;
    }
  });

  downloadBtn.addEventListener("click", async () => {
    setStatus("⏳ downloading started...");

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const url = tab.url;

      const response = await fetch("http://localhost:8000/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });

      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

      // Get filename from response headers
      const disposition = response.headers.get("Content-Disposition");
      let filename = "video.mp4";
      if (disposition && disposition.includes("filename=")) {
        filename = disposition.split("filename=")[1].replace(/["']/g, "");
      }

      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setStatus("✅ Download successful!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to start download", "error");
    }
  });
});
