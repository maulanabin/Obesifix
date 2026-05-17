import pandas as pd
from sklearn.neighbors import NearestNeighbors
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
dataset_file = os.path.join(BASE_DIR, "dataset", "new_recommendation_processedfinal.csv")

class Recommender:
    def __init__(self):
        self.data = pd.read_csv(dataset_file)

    def get_features(self):
        preference_dummies = self.data.FoodCategory.str.get_dummies()
        cal_dummies = self.data.cal_standart.str.get_dummies(sep=" ")
        fat_dummies = self.data.fat_standart.str.get_dummies(sep=" ")
        carb_dummies = self.data.carbo_standart.str.get_dummies(sep=" ")
        protein_dummies = self.data.protein_standart.str.get_dummies(sep=" ")
        return pd.concat(
            [preference_dummies, cal_dummies, fat_dummies, carb_dummies, protein_dummies], axis=1
        )

    def k_neighbor(self, inputs):
        feature_df = self.get_features()
        model = NearestNeighbors(n_neighbors=25, algorithm="ball_tree")
        model.fit(feature_df)

        distances, indices = model.kneighbors(inputs)
        df_results = pd.DataFrame(columns=list(self.data.columns))

        for i in list(indices):
            df_results = pd.concat([df_results, self.data.loc[i]], ignore_index=True)

        df_results = df_results.filter(
            ["Name", "Images", "Calories", "FatContent",
             "CarbohydrateContent", "ProteinContent", "Keywords", "FoodCategory"]
        ).drop_duplicates(subset=["Name"]).reset_index(drop=True).head(25)

        return df_results

    @staticmethod
    def recommend(nutrition_status, food_type):
        ob = Recommender()
        data = ob.get_features()
        total_features = data.columns
        d = {i: 0 for i in total_features}

        if nutrition_status == "obese":
            d.update({"low_cal":1,"low_fat":1,"low_carb":1,"low_pro":1})
        elif nutrition_status == "overweight":
            d.update({"so_so_cal":1,"low_fat":1,"low_carb":1,"low_pro":1})
        elif nutrition_status == "normal":
            d.update({"midhigh_cal":1,"so_so_fat":1,"so_carb":1,"so_so_pro":1})
        elif nutrition_status == "underweight":
            d.update({"high_cal":1,"high_fat":1,"high_carb":1,"high_pro":1})

        for i in food_type.split(","):
            d[i] = 1

        final_input = list(d.values())
        return ob.k_neighbor([final_input])
