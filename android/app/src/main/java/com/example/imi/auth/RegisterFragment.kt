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
import com.google.firebase.auth.userProfileChangeRequest
import com.google.firebase.firestore.FirebaseFirestore

class RegisterFragment : Fragment() {
    private lateinit var etDisplayName: TextInputEditText
    private lateinit var etUsername: TextInputEditText
    private lateinit var etPhone: TextInputEditText
    private lateinit var etPassword: TextInputEditText
    private lateinit var btnSubmit: MaterialButton
    private lateinit var pbLoading: ProgressBar
    private val auth: FirebaseAuth by lazy { FirebaseAuth.getInstance() }
    private val firestore: FirebaseFirestore by lazy { FirebaseFirestore.getInstance() }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val view = inflater.inflate(R.layout.fragment_register, container, false)
        etDisplayName = view.findViewById(R.id.etRegisterDisplayName)
        etUsername = view.findViewById(R.id.etRegisterUsername)
        etPhone = view.findViewById(R.id.etRegisterPhone)
        etPassword = view.findViewById(R.id.etRegisterPassword)
        btnSubmit = view.findViewById(R.id.btnRegisterSubmit)
        pbLoading = view.findViewById(R.id.pbRegisterLoading)
        btnSubmit.setOnClickListener { performRegister() }
        return view
    }

    private fun performRegister() {
        val displayName = etDisplayName.text?.toString()?.trim() ?: ""
        val username = etUsername.text?.toString()?.trim() ?: ""
        val phone = etPhone.text?.toString()?.trim() ?: ""
        val password = etPassword.text?.toString()?.trim() ?: ""
        if (displayName.isEmpty() || username.length < 3 || password.length < 6) return
        val cleanUser = username.replace(Regex("[^a-zA-Z0-9_]"), "").lowercase()
        val email = "$cleanUser@imi.app"
        pbLoading.visibility = View.VISIBLE
        auth.createUserWithEmailAndPassword(email, password).addOnSuccessListener { res ->
            val user = res.user ?: return@addOnSuccessListener
            user.updateProfile(userProfileChangeRequest { this.displayName = displayName })
            val userData = hashMapOf("authUid" to user.uid, "displayName" to displayName, "username" to cleanUser, "phoneNumber" to phone, "online" to true, "lastSeen" to System.currentTimeMillis())
            firestore.collection("users").document(user.uid).set(userData).addOnSuccessListener { navigateToMain() }
        }.addOnFailureListener { pbLoading.visibility = View.GONE }
    }

    private fun navigateToMain() {
        startActivity(Intent(requireContext(), MainActivity::class.java).apply { flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK })
        activity?.finish()
    }
}
