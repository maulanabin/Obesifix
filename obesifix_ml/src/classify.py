import tensorflow as tf
from keras.utils import load_img, img_to_array
import requests
from PIL import Image
from io import BytesIO
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

nutrition_file = os.path.join(BASE_DIR, "dataset", "nutritionperserving0_18.csv")
model_file = os.path.join(BASE_DIR, "model", "model_prep_rms_new.h5")

data = pd.read_csv(nutrition_file)
names = data.ingr

model = tf.keras.models.load_model(model_file)

# def classify_image(url):
#     response = requests.get(url)
#     img = Image.open(BytesIO(response.content))
#     x = img_to_array(img.resize((256, 256)))
#     x = tf.expand_dims(x, axis=0) / 255.
#     classes = model.predict(x, batch_size=128).argmax(axis=1)[0]

#     name = names[classes]
#     serving = data["serving(g)"][classes]
#     calorie = data["cal/g"][classes]
#     fat = data["fat(g)"][classes]
#     carb = data["carb(g)"][classes]
#     protein = data["protein(g)"][classes]
#     desc = data["description(g)"][classes]

#     return {
#         "name": name,
#         "serving": int(serving),
#         "total_cal": serving * calorie,
#         "total_fat": serving * fat,
#         "total_carb": serving * carb,
#         "total_protein": serving * protein,
#         "description": desc
#     }

def classify_image(file):
    try:
        # buka image dengan context manager
        with Image.open(file.stream) as img:
            x = img_to_array(img.resize((256, 256)))
            x = tf.expand_dims(x, axis=0) / 255.

            classes = model.predict(x, batch_size=128).argmax(axis=1)[0]

        # ambil data hasil prediksi
        name = names[classes]
        serving = data["serving(g)"][classes]
        calorie = data["cal/g"][classes]
        fat = data["fat(g)"][classes]
        carb = data["carb(g)"][classes]
        protein = data["protein(g)"][classes]
        desc = data["description(g)"][classes]

        return {
            "name": name,
            "serving": int(serving),
            "total_cal": serving * calorie,
            "total_fat": serving * fat,
            "total_carb": serving * carb,
            "total_protein": serving * protein,
            "description": desc
        }
    except Exception as e:
        # fallback untuk error lain
        return {"error": f"Something went wrong: {str(e)}"}

# classify_image("https://th.bing.com/th/id/R.75348e3655bfc3f8a5122dfbd022752a?rik=dE6FJEO%2fzAKgSA&riu=http%3a%2f%2fwww.justshortofcrazy.com%2fwp-content%2fuploads%2f2015%2f05%2fFried-Rice-Final-3.jpg&ehk=WN%2bubkqi0%2fQ57gaJKLo4%2bhM86%2bJL%2bDgfzG3zOaUDbNE%3d&risl=1&pid=ImgRaw&r=0")
