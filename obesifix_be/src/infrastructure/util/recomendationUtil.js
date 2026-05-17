export const calculateNutritionStatus = (user) => {
  const weight = user.weight;
  const height_in_m = user.height / 100;

  const nutritionValue = weight / (height_in_m * height_in_m);
  const formatedNutritionValue = nutritionValue.toFixed(1);
  const parsedNutritionValue = parseFloat(formatedNutritionValue);

  let status = "";
  if (parsedNutritionValue < 18.5) {
    status = "underweight";
  } else if (parsedNutritionValue >= 18.5 && parsedNutritionValue <= 24.9) {
    status = "normal";
  } else if (parsedNutritionValue >= 25 && parsedNutritionValue <= 29.9) {
    status = "overweight";
  } else if (parsedNutritionValue >= 30) {
    status = "obese";
  }

  return status;
};

export const recomendationToArrayConverter = (recomendation) => {
  const tempData = {
    name: "",
    image: "",
    calorie: 0,
    fat: "",
    carbohydrate: 0,
    protein: 0,
    keyword: "",
    food_category: "",
  };
  const objKey = Object.keys(recomendation);
  let tempArr = [];
  const index = Object.keys(recomendation.Calories).length;
  for (let i = 0; i < index; i++) {
    let tempObj = { ...tempData };
    tempObj.name = recomendation.Name[i];
    tempObj.image = recomendation.Images[i];
    tempObj.calorie = recomendation.Calories[i];
    tempObj.fat = recomendation.FatContent[i];
    tempObj.carbohydrate = recomendation.CarbohydrateContent[i];
    tempObj.protein = recomendation.ProteinContent[i];
    tempObj.keyword = recomendation.Keywords[i];
    tempObj.food_category = recomendation.FoodCategory[i];
    tempArr = [...tempArr, tempObj];
  }
  //  CHAR FILTERUBG
  stringSelector(tempArr);
  return tempArr;
};

const stringSelector = (payloads) => {
  payloads.forEach((food, i) => {
    // FILTERING KEYWORD
    if (food.keyword[0] === "c") {
      food.keyword = filterStr1(food.keyword);
    } else {
      food.keyword = filterStr2(food.keyword);
    }
    // FILTERING IMAGE
    if (food.image[0] === "c") {
      const finalTempStr_1 = filterStr1(food.image);
      const arrStr = finalTempStr_1.split(", ");
      food.image = arrStr[0];
    } else {
      food.image = filterStr2(food.image);
    }
  });
};

const filterStr1 = (str) => {
  let tempStr = str;
  const newTempStr_1 = tempStr.replace("c", "");
  const newTempStr_2 = newTempStr_1.replace("(", "");
  const newTempStr_3 = newTempStr_2.replace(")", "");
  const tempRegex = new RegExp('"', "g");
  const finalTempStr_1 = newTempStr_3.replace(tempRegex, "");
  return finalTempStr_1;
};

const filterStr2 = (str) => {
  let tempStr = str;
  const tempRegex = new RegExp('"', "g");
  const finalTempStr_1 = tempStr.replace(tempRegex, "");
  return finalTempStr_1;
};

export default stringSelector;
