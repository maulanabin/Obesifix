package org.obesifix.obesifix.ui.login

import androidx.lifecycle.ViewModel
import org.obesifix.obesifix.network.payload.LoginBody
import org.obesifix.obesifix.network.payload.RegisterBody
import javax.inject.Inject

class LoginViewModel@Inject constructor(private val loginRepository: LoginRepository):ViewModel() {

    val loginResponse = loginRepository.loginResponse

    val isLoading = loginRepository.isLoading

    fun requestLogin(loginBody: LoginBody) =
        loginRepository.requestLogin(loginBody)


}
