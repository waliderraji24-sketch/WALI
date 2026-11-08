package com.example.imi

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.media.AudioManager
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import com.example.imi.chat.ChatsFragment
import com.example.imi.contacts.ContactsFragment
import com.example.imi.profile.ProfileFragment
import com.example.imi.reels.ReelsFragment
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

class MainActivity : AppCompatActivity() {

    private lateinit var bottomNav: BottomNavigationView
    private lateinit var tvToolbarTitle: TextView

    private val auth: FirebaseAuth by lazy { FirebaseAuth.getInstance() }
    private val firestore: FirebaseFirestore by lazy { FirebaseFirestore.getInstance() }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        bottomNav = findViewById(R.id.bottomNav)
        tvToolbarTitle = findViewById(R.id.tvToolbarTitle)

        if (savedInstanceState == null) {
            loadFragment(ChatsFragment())
            tvToolbarTitle.text = "Chats"
        }

        bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_chats -> {
                    tvToolbarTitle.text = "Chats"
                    loadFragment(ChatsFragment())
                    true
                }
                R.id.nav_reels -> {
                    tvToolbarTitle.text = "Reels"
                    loadFragment(ReelsFragment())
                    true
                }
                R.id.nav_contacts -> {
                    tvToolbarTitle.text = "Friends"
                    loadFragment(ContactsFragment())
                    true
                }
                R.id.nav_profile -> {
                    tvToolbarTitle.text = "Profile"
                    loadFragment(ProfileFragment())
                    true
                }
                else -> false
            }
        }

        updateUserOnlineStatus(true)
    }

    fun selectTab(itemId: Int) { bottomNav.selectedItemId = itemId }

    private fun loadFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction().replace(R.id.fragmentContainer, fragment).commit()
    }

    private fun updateUserOnlineStatus(online: Boolean) {
        val uid = auth.currentUser?.uid ?: return
        firestore.collection("users").document(uid).update(mapOf("online" to online, "lastSeen" to System.currentTimeMillis()))
    }

    fun checkAndRequestContactsPermission() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_CONTACTS) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.READ_CONTACTS), 101)
        }
    }

    fun startCallAudioRouting(callType: String, isSpeaker: Boolean) {
        val audioManager = getSystemService(Context.AUDIO_SERVICE) as AudioManager
        audioManager.mode = AudioManager.MODE_IN_COMMUNICATION
        audioManager.isSpeakerphoneOn = isSpeaker
    }

    fun setSpeakerphoneOn(isSpeaker: Boolean) {
        val audioManager = getSystemService(Context.AUDIO_SERVICE) as AudioManager
        audioManager.isSpeakerphoneOn = isSpeaker
    }

    fun stopCallAudioRouting() {
        val audioManager = getSystemService(Context.AUDIO_SERVICE) as AudioManager
        audioManager.mode = AudioManager.MODE_NORMAL
        audioManager.isSpeakerphoneOn = false
    }

    override fun onResume() { super.onResume(); updateUserOnlineStatus(true) }
    override fun onPause() { super.onPause(); updateUserOnlineStatus(false) }
}
