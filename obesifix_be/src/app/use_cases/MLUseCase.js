import fetch from "node-fetch";
import FormData from "form-data";
import {
  calculateNutritionStatus,
  recomendationToArrayConverter,
} from "../../infrastructure/util/recomendationUtil.js";

export default class MLUseCase {
  constructor(userRpository, configLoader) {
    this.userRpository = userRpository;
    this.configLoader = configLoader;
  }

  async preprocessImage(imageFile) {
    if (!imageFile) {
      throw new Error("Image file is required");
    }

    const form = new FormData();
    form.append("image", imageFile.buffer, {
      filename: imageFile.originalname,
      contentType: imageFile.mimetype,
    });

    const mlUrl = this.configLoader.ML_BASE_URL + "/prediction";

    const response = await fetch(mlUrl, {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`ML API error: ${response.statusText}`);
    }

    const result = await response.json();

    return result;
  }

  async getRecomendations(userId) {
    const user = await this.userRpository.getById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const nutritionStatus = calculateNutritionStatus(user);
    const foodType = user.food_type;

    const mlUrl = this.configLoader.ML_BASE_URL + "/recommendation";

    const response = await fetch(mlUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nutrition_status: nutritionStatus,
        food_type: foodType,
      }),
    });

    if (!response.ok) {
      throw new Error(`ML API error: ${response.statusText}`);
    }

    const responseData = await response.json();

    const result = recomendationToArrayConverter(responseData.food_list);

    return result;
  }
}
