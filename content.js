(function () {
    // Check if the button already exists
    if (document.getElementById('yt-download-btn')) return;
  
    const button = document.createElement('button');
    button.innerText = '⬇ Download Video';
    button.id = 'yt-download-btn';
    button.style = `
      position: relative;
      z-index: 9999;
      margin: 10px;
      padding: 10px;
      font-size: 14px;
      background-color: red;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    `;
  
    // Inject the button somewhere in the page — below the title, for example
    const target = document.querySelector('#above-the-fold #title');
  
    if (target) {
      target.parentElement.appendChild(button);
    }
  
    button.addEventListener('click', () => {
      const videoUrl = window.location.href;
      chrome.runtime.sendMessage({ action: 'download', url: videoUrl });
    });
  })();
  