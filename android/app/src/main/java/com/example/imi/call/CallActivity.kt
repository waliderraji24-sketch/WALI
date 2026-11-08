package com.example.imi.call

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.example.imi.R

class CallActivity : AppCompatActivity() {

    private lateinit var ivAvatar: ImageView
    private lateinit var tvName: TextView
    private lateinit var tvDuration: TextView
    private lateinit var btnToggleMic: ImageView
    private lateinit var btnSwitchCamera: ImageView
    private lateinit var btnEndCall: ImageView

    private var isMuted = false
    private var isVideo = false
    private var callDuration = 0
    private var isCallActive = true

    private val timerHandler = Handler(Looper.getMainLooper())
    private val timerRunnable = object : Runnable {
        override fun run() {
            if (isCallActive) {
                callDuration++
                val m = callDuration / 60
                val s = callDuration % 60
                tvDuration.text = String.format("%02d:%02d", m, s)
                timerHandler.postDelayed(this, 1000)
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_call)

        val peerName = intent.getStringExtra("peerName") ?: "مستخدم IMI"
        val peerAvatar = intent.getStringExtra("peerAvatar")
        isVideo = intent.getBooleanExtra("isVideo", false)

        ivAvatar = findViewById(R.id.ivCallPeerAvatar)
        tvName = findViewById(R.id.tvCallPeerName)
        tvDuration = findViewById(R.id.tvCallDuration)
        btnToggleMic = findViewById(R.id.btnToggleMic)
        btnSwitchCamera = findViewById(R.id.btnSwitchCamera)
        btnEndCall = findViewById(R.id.btnEndCall)

        tvName.text = peerName
        if (!peerAvatar.isNullOrEmpty()) {
            Glide.with(this)
                .load(peerAvatar)
                .placeholder(R.mipmap.ic_launcher)
                .circleCrop()
                .into(ivAvatar)
        }

        tvDuration.text = if (isVideo) "مكالمة فيديو نشطة (00:00)" else "مكالمة صوتية نشطة (00:00)"
        timerHandler.post(timerRunnable)

        btnToggleMic.setOnClickListener {
            isMuted = !isMuted
            btnToggleMic.setColorFilter(if (isMuted) 0xFFEF4444.toInt() else 0xFFFFFFFF.toInt())
            Toast.makeText(this, if (isMuted) "تم كتم الصوت" else "تم تشغيل الصوت", Toast.LENGTH_SHORT).show()
        }

        btnSwitchCamera.setOnClickListener {
            Toast.makeText(this, "تم تبديل الكاميرا", Toast.LENGTH_SHORT).show()
        }

        btnEndCall.setOnClickListener {
            endCall()
        }
    }

    private fun endCall() {
        isCallActive = false
        timerHandler.removeCallbacks(timerRunnable)
        Toast.makeText(this, "تم إنهاء المكالمة ($callDuration ثانية)", Toast.LENGTH_SHORT).show()
        finish()
    }

    override fun onDestroy() {
        super.onDestroy()
        isCallActive = false
        timerHandler.removeCallbacks(timerRunnable)
    }
}
