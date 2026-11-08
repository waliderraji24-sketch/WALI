package com.example.imi.auth

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.example.imi.R
import com.google.android.material.tabs.TabLayout

class AuthActivity : AppCompatActivity() {
    private lateinit var tabLayoutAuth: TabLayout
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_auth)
        tabLayoutAuth = findViewById(R.id.tabLayoutAuth)
        replaceFragment(LoginFragment())
        tabLayoutAuth.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
            override fun onTabSelected(tab: TabLayout.Tab?) {
                when (tab?.position) {
                    0 -> replaceFragment(LoginFragment())
                    1 -> replaceFragment(RegisterFragment())
                }
            }
            override fun onTabUnselected(tab: TabLayout.Tab?) {}
            override fun onTabReselected(tab: TabLayout.Tab?) {}
        })
    }
    private fun replaceFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction().replace(R.id.authContainer, fragment).commit()
    }
}
