package com.example.imi.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "conversations")
data class ConversationEntity(
    @PrimaryKey
    val chatId: String,
    val isGroup: Boolean,
    val groupName: String?,
    val participantsJson: String,
    val lastMessage: String?,
    val lastMessageSender: String?,
    val lastMessageTime: Long,
    val lastMessageStatus: String?,
    val unreadCount: Int = 0
)
