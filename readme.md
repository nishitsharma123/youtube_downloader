YouTube Video Downloader Extension (with FastAPI Backend)
This is a full-fledged browser extension powered by a Python FastAPI backend that allows users to download YouTube videos by just clicking a button in their browser.

🔧 Built with FastAPI and yt_dlp for video downloading

🧩 Includes a Chrome extension to trigger downloads via UI

🌐 Can be run locally or deployed 

🚀 Features
Download videos from YouTube in one click

Lightweight browser extension interface

FastAPI backend for handling download logic

Error-handled responses with user feedback

Easily customizable for personal or team use

🛠️ Tech Stack
🐍 Python (FastAPI)

🛠️ yt_dlp for video downloads

🧱 HTML/CSS/JS for the Chrome extension

☁️ Optional: Deploy on Render

📦 Installation
1. Clone the Repo

git clone https://github.com/your-username/youtube-video-downloader.git
cd youtube-video-downloader
2. Set Up the Python Backend
Option A: Run Locally
# Create a virtual environment
python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI app
uvicorn app:app --host 0.0.0.0 --port 8000
Make sure port 8000 is open and available.

Option B: Deploy on Render
Upload this repository to GitHub.

Go to render.com → Create a Web Service.

Use the following build and start commands:


# Build Command:
pip install -r requirements.txt

# Start Command:
uvicorn app:app --host 0.0.0.0 --port 8000
Add the yt_dlp dependency to requirements.txt:


🌐 Frontend: Chrome Extension Setup
📁 Structure
pgsql
Copy
Edit
extension/
├── manifest.json
├── popup.html
├── popup.js
└── style.css
🧩 How to Add the Extension in Chrome
Open Chrome and go to:


chrome://extensions
Enable Developer Mode (top-right).

Click on "Load unpacked".

Select the extension/ folder.

Done! You’ll see the extension icon in your toolbar.

✅ Click the extension and paste the YouTube URL to start downloading.

📬 Usage
Run the backend (locally or via Render).

Install the Chrome extension.

Go to YouTube, copy the video link, click the extension icon, and paste the link.

The FastAPI backend will process the request and download the video using yt_dlp.

❗Troubleshooting
If the video returns "unavailable," it may be region-restricted or removed by YouTube.

Ensure the backend is running on the correct port (8000 by default).

Confirm yt_dlp is installed in your environment.

For Render: make sure yt_dlp is in requirements.txt.