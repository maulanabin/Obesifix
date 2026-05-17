from flask import Blueprint, request, jsonify

from src.classify import classify_image
from src.recommendation import Recommender

import os

bp = Blueprint("routes", __name__)

@bp.route("/", methods=["GET"])
def hello():
    return "Hello Flask Server"

@bp.route("/recommendation", methods=["POST"])
def get_recommendation():
    request_json = request.json
    nutrition_status = request_json["nutrition_status"]
    food_type = request_json["food_type"]
    result = Recommender.recommend(nutrition_status, food_type)
    data_dic = result.to_dict()
    return jsonify({"food_list": data_dic})

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
    return jsonify({"food_data": class_dict})