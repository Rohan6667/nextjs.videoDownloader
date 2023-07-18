from flask import Flask, jsonify
from flask_cors import CORS
import yt_dlp

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def main_route():
    return ""


@app.route("/<video_id>", methods=["GET"])
def video_json(video_id):
    with yt_dlp.YoutubeDL({}) as ydl:
        try:
            info = ydl.extract_info(
                "https://www.youtube.com/watch?v=" + video_id, download=False
            )
            return jsonify(ydl.sanitize_info(info))
        except:
            return jsonify({"error": "Bad URL"})


if __name__ == "__main__":
    app.run(debug=True, port=8080)