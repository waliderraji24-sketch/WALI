package com.example.imi.auth

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ProgressBar
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.example.imi.MainActivity
import com.example.imi.R
import com.google.android.material.button.MaterialButton
import com.google.android.material.textfield.TextInputEditText
import com.google.firebase.auth.FirebaseAuth

class LoginFragment : Fragment() {
    private lateinit var etUsername: TextInputEditText
    private lateinit var etPassword: TextInputEditText
    private lateinit var btnSubmit: MaterialButton
    private lateinit var tvError: TextView
    private lateinit var pbLoading: ProgressBar
    private val auth: FirebaseAuth by lazy { FirebaseAuth.getInstance() }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val view = inflater.inflate(R.layout.fragment_login, container, false)
        etUsername = view.findViewById(R.id.etLoginUsername)
        etPassword = view.findViewById(R.id.etLoginPassword)
        btnSubmit = view.findViewById(R.id.btnLoginSubmit)
        tvError = view.findViewById(R.id.tvLoginError)
        pbLoading = view.findViewById(R.id.pbLoginLoading)
        btnSubmit.setOnClickListener { performLogin() }
        return view
    }

    private fun performLogin() {
        val input = etUsername.text?.toString()?.trim() ?: ""
        val password = etPassword.text?.toString()?.trim() ?: ""
        if (input.isEmpty() || password.length < 6) return
        val email = if (input.contains("@")) input else "${input.replace(Regex("[^a-zA-Z0-9_]"), "").lowercase()}@imi.app"
        pbLoading.visibility = View.VISIBLE
        auth.signInWithEmailAndPassword(email, password).addOnSuccessListener { navigateToMain() }.addOnFailureListener { pbLoading.visibility = View.GONE }
    }

    private fun navigateToMain() {
        startActivity(Intent(requireContext(), MainActivity::class.java).apply { flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK })
        activity?.finish()
    }
}
