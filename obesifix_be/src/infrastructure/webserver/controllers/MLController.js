export default class MLController {
  constructor(mlUseCase) {
    this.mlUseCase = mlUseCase;
  }

  classification = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(403).json({
          status: false,
          message: "Image is required",
        });
      }

      const { food_data } = await this.mlUseCase.preprocessImage(req.file);

      res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Success classify food image",
        food_data: {
          description: food_data.description,
          name: food_data.name,
          serving: food_data.serving,
          total_cal: food_data.total_cal,
          total_carb: food_data.total_carb,
          total_fat: food_data.total_fat,
          total_protein: food_data.total_protein,
        },
      });
    } catch (error) {
      res.status(400).send({ status: false, message: error.message });
    }
  };

  recomendation = async (req, res) => {
    try {
      const userId = req.params.userId;
      if (!userId) {
        return res.status(403).json({
          status: false,
          message: "User ID is required",
        });
      }

      const foodList = await this.mlUseCase.getRecomendations(userId);

      res.status(200).send({
        status: true,
        statusCode: 200,
        food_list: foodList,
      });
    } catch (error) {
      res.status(400).send({ status: false, message: error.message });
    }
  };
}
