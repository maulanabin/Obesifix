package org.obesifix.obesifix.ui.detail

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import javax.inject.Inject

class DetailViewModel@Inject constructor(application: Application, private val detailRepository: DetailRepository) :
    AndroidViewModel(application) {

    fun addNutrition(userid: String, foodname: String, calorie: Float, fat: Float, protein: Float, carbohydrate: Float, date: String) {
        detailRepository.addNutritionData(userid, foodname, calorie, fat, protein, carbohydrate, date)
    }

}
