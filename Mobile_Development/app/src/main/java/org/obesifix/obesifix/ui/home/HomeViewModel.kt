package org.obesifix.obesifix.ui.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch
import javax.inject.Inject

class HomeViewModel@Inject constructor(private val homeRepository: HomeRepository) : ViewModel() {
    val listItem = homeRepository.listItem
    val userData = homeRepository.userDataResponse
    val isLoading = homeRepository.isLoading
    val isNavigate = homeRepository.navigateToLogin
    fun getRecommendation(token:String, id:String){
        viewModelScope.launch {
            homeRepository.getRecommendation(token,id)
        }
    }

    fun getUserData(token: String, id: String){
        homeRepository.getUserData(token, id)
    }

}
