package com.example.imi.contacts

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.imi.R
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

class ContactsFragment : Fragment() {
    private lateinit var rv: RecyclerView
    private lateinit var ad: ContactsAdapter
    private val auth by lazy { FirebaseAuth.getInstance() }
    private val db by lazy { FirebaseFirestore.getInstance() }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val v = inflater.inflate(R.layout.fragment_contacts, container, false)
        rv = v.findViewById(R.id.rvContactsList)
        ad = ContactsAdapter()
        rv.layoutManager = LinearLayoutManager(requireContext())
        rv.adapter = ad
        load()
        return v
    }

    private fun load() {
        val uid = auth.currentUser?.uid ?: return
        db.collection("users").limit(100).addSnapshotListener { snap, _ ->
            val list = snap?.documents?.mapNotNull { d -> if (d.id == uid) null else ContactModel(d.id, d.getString("displayName") ?: d.getString("username") ?: "مستخدم", d.getString("phoneNumber"), d.getString("photoURL"), d.getBoolean("online") ?: false) } ?: return@addSnapshotListener
            ad.submitList(list)
        }
    }
}
