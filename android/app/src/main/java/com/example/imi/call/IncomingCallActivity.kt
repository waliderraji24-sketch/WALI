package com.example.imi.call

import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.imi.R

class IncomingCallActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_incoming_call)
        findViewById<TextView>(R.id.tvCallerName).text = intent.getStringExtra("callerName") ?: "Friend"
        findViewById<View>(R.id.btnAccept).setOnClickListener { 
            // In a real app, this would start the CallActivity
            finish() 
        }
        findViewById<View>(R.id.btnDecline).setOnClickListener { finish() }
    }
}
