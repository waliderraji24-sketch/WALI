package com.example.imi.call

import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.imi.R
import java.lang.ref.WeakReference

class IncomingCallActivity : AppCompatActivity() {

    companion object {
        private var activeInstanceRef: WeakReference<IncomingCallActivity>? = null

        fun dismissActiveCall() {
            activeInstanceRef?.get()?.finish()
            activeInstanceRef = null
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        activeInstanceRef = WeakReference(this)
        setContentView(R.layout.activity_incoming_call)
        
        findViewById<TextView>(R.id.tvCallerName).text = intent.getStringExtra("callerName") ?: "Friend"
        findViewById<View>(R.id.btnAccept).setOnClickListener { finish() }
        findViewById<View>(R.id.btnDecline).setOnClickListener { finish() }
    }

    override fun onDestroy() {
        super.onDestroy()
        if (activeInstanceRef?.get() == this) {
            activeInstanceRef = null
        }
    }
}
