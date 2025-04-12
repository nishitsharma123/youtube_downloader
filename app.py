from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import yt_dlp
import ffmpeg
import uuid
import os
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["chrome-extension://*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/download")
async def download(request: Request):
    data = await request.json()
    video_url = data.get("url")
    uid = str(uuid.uuid4())
    out_dir = f"downloads/{uid}"
    os.makedirs(out_dir, exist_ok=True)

    try:
       


             # Download best audio and video separately
        ydl_opts = {
            'format': 'bestvideo+bestaudio/best',
            'outtmpl': f'{out_dir}/%(id)s.%(ext)s',
            'merge_output_format': 'mkv',  # initial merge, re-encode later
            'quiet': True,
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=True)
            video_id = info.get("id")
            title = info.get("title", "video")

        # Find the downloaded MKV or MP4 file
        downloaded_file = next(
            (os.path.join(out_dir, f) for f in os.listdir(out_dir) if f.endswith(".mkv") or f.endswith(".mp4")),
            None
        )
        if not downloaded_file:
            raise Exception("Failed to locate downloaded video.")

        # Convert to MP4 with AAC audio for max compatibility
        output_file = os.path.join(out_dir, f"{video_id}_final.mp4")
        ffmpeg.input(downloaded_file).output(
            output_file,
            vcodec="copy",
            acodec="aac",
            strict="experimental",
            loglevel="error"
        ).run()

        # Sanitize the filename for browser download
        safe_title = "".join(c for c in title if c.isalnum() or c in " _-").rstrip()
        final_filename = f"{safe_title}.mp4"

        return FileResponse(output_file, filename=final_filename)
            

    except Exception as e:
        print("Download Error:", e)
        return JSONResponse(content={"error": str(e)}, status_code=500)

    finally:
        # Optional cleanup
        import threading, time
        def cleanup(path):
            time.sleep(60)
            shutil.rmtree(path, ignore_errors=True)
        threading.Thread(target=cleanup, args=(out_dir,)).start()

