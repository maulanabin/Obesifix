from flask import Blueprint, request, jsonify

from src.classify import classify_image
from src.recommendation import Recommender

bp = Blueprint("routes", __name__)

@bp.route("/", methods=["GET"])
def hello():
    return "Hello Flask Server"

@bp.route("/recommendation", methods=["POST"])
def get_recommendation():
    request_json = request.get_json(silent=True) or {}
    nutrition_status = request_json.get("nutrition_status")
    food_type = request_json.get("food_type")

    if not nutrition_status or not food_type:
        return jsonify({"error": "nutrition_status and food_type are required"}), 400

    try:
        result = Recommender.recommend(nutrition_status, food_type)
        data_dic = result.to_dict()
        return jsonify({"food_list": data_dic})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500

# @bp.route("/prediction", methods=["POST"])
# def classify():
#     request_json = request.json
#     url = request_json["image_url"]
#     class_dict = classify_image(url)
#     return jsonify({"food_data": class_dict})

@bp.route("/prediction", methods=["POST"])
def classify():
    if "image" not in request.files:
        return jsonify({"error": "No image file uploaded"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    # kirim file object ke classify_image
    class_dict = classify_image(file)
    if "error" in class_dict:
        return jsonify(class_dict), 500

    return jsonify({"food_data": class_dict})
