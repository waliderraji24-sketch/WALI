package com.example.imi.profile

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.bumptech.glide.Glide
import com.example.imi.R
import com.example.imi.auth.AuthActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

class ProfileFragment : Fragment() {

    private lateinit var ivAvatar: ImageView
    private lateinit var tvUsername: TextView
    private lateinit var tvEmail: TextView
    private lateinit var btnLogout: Button

    private val auth: FirebaseAuth by lazy { FirebaseAuth.getInstance() }
    private val db: FirebaseFirestore by lazy { FirebaseFirestore.getInstance() }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val v = inflater.inflate(R.layout.fragment_profile, container, false)
        
        ivAvatar = v.findViewById(R.id.ivProfileAvatar)
        tvUsername = v.findViewById(R.id.tvProfileUsername)
        tvEmail = v.findViewById(R.id.tvProfileEmail)
        btnLogout = v.findViewById(R.id.btnLogout)

        btnLogout.setOnClickListener {
            auth.signOut()
            startActivity(Intent(requireContext(), AuthActivity::class.java))
            requireActivity().finish()
        }

        loadProfile()
        
        return v
    }

    private fun loadProfile() {
        val uid = auth.currentUser?.uid ?: return
        db.collection("users").document(uid).addSnapshotListener { snap, _ ->
            snap?.let { d ->
                tvUsername.text = d.getString("username") ?: "Unknown"
                tvEmail.text = d.getString("email") ?: auth.currentUser?.email ?: ""
                val avatar = d.getString("avatarUrl")
                if (!avatar.isNullOrEmpty()) {
                    Glide.with(this).load(avatar).into(ivAvatar)
                }
            }
        }
    }
}
