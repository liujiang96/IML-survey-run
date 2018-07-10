from flask import Flask, jsonify, send_file, request, render_template
import os, sys
from scripts.configs import config
from scripts.backend import load_manifest_data
SERVER_ROOT = os.path.dirname(sys.modules[__name__].__file__)
app = Flask(__name__)

# @app.route('/')
# def hello_world():
#     return app.send_static_file("index.html")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/manifest", methods=["GET"])
def get_manifest():
    dataset_path = os.path.join(SERVER_ROOT, "data")
    d = load_manifest_data(os.path.join(dataset_path, config.info_manifest_name))
    return jsonify(d)
if __name__ == '__main__':
    app.run(port=8081, host="0.0.0.0", threaded=True)