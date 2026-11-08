package com.example.imi.chat

import android.os.Bundle
import android.widget.EditText
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.imi.R
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import java.util.UUID

class ChatRoomActivity : AppCompatActivity() {
    private lateinit var rv: RecyclerView
    private lateinit var et: EditText
    private lateinit var ad: MessageAdapter
    private val auth by lazy { FirebaseAuth.getInstance() }
    private val db by lazy { FirebaseFirestore.getInstance() }
    private var cid: String = ""
    private var peer: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_chat_room)
        cid = intent.getStringExtra("chatId") ?: ""
        peer = intent.getStringExtra("peerUid") ?: ""
        val uid = auth.currentUser?.uid ?: return
        rv = findViewById(R.id.rvMessages)
        et = findViewById(R.id.etMessageInput)
        ad = MessageAdapter(uid)
        rv.layoutManager = LinearLayoutManager(this).apply { stackFromEnd = true }
        rv.adapter = ad
        findViewById<ImageView>(R.id.btnSendMessage).setOnClickListener { send() }
        findViewById<ImageView>(R.id.btnChatBack).setOnClickListener { finish() }
        listen()
    }

    private fun listen() {
        if (cid.isEmpty()) return
        db.collection("chats").document(cid).collection("messages").orderBy("timestamp", Query.Direction.ASCENDING).addSnapshotListener { snap, _ ->
            val msgs = snap?.documents?.mapNotNull { d -> MessageModel(d.id, cid, d.getString("sender") ?: "", d.getString("receiverId") ?: "", d.getString("text") ?: "", d.getString("type") ?: "text", d.getString("mediaUrl"), d.getLong("duration")?.toInt(), d.getLong("timestamp") ?: 0, d.getString("status") ?: "sent") } ?: return@addSnapshotListener
            ad.submitList(msgs) { if (msgs.isNotEmpty()) rv.scrollToPosition(msgs.size - 1) }
        }
    }

    private fun send() {
        val t = et.text.toString().trim(); if (t.isEmpty()) return
        val uid = auth.currentUser?.uid ?: return
        val mid = UUID.randomUUID().toString()
        val now = System.currentTimeMillis()
        val m = hashMapOf("id" to mid, "chatId" to cid, "sender" to uid, "receiverId" to peer, "text" to t, "type" to "text", "timestamp" to now, "status" to "sent")
        db.collection("chats").document(cid).collection("messages").document(mid).set(m)
        db.collection("chats").document(cid).update(mapOf("lastMessage" to t, "lastMessageTime" to now, "lastMessageSender" to uid))
        et.setText("")
    }
}
