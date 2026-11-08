package com.example.imi.chat

data class ConversationModel(
    val chatId: String,
    val peerUid: String,
    val peerName: String,
    val peerAvatar: String?,
    val lastMessage: String,
    val lastMessageTime: Long,
    val unreadCount: Int = 0,
    val isOnline: Boolean = false
)
