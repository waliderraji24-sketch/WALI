package com.example.imi.chat

data class MessageModel(
    val id: String = "",
    val chatId: String = "",
    val sender: String = "",
    val receiverId: String = "",
    val text: String = "",
    val type: String = "text",
    val mediaUrl: String? = null,
    val duration: Int? = null,
    val timestamp: Long = System.currentTimeMillis(),
    val status: String = "sent"
)
