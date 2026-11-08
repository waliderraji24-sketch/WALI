package com.example.imi.data.local.entity

import androidx.room.Entity
import androidx.room.Index
import androidx.room.PrimaryKey

@Entity(
    tableName = "messages",
    indices = [
        Index(value = ["chatId"]),
        Index(value = ["createdAt"])
    ]
)
data class MessageEntity(
    @PrimaryKey
    val messageId: String,
    val chatId: String,
    val senderId: String,
    val receiverId: String,
    val type: String, // 'text', 'voice', 'image', 'video'
    val text: String?,
    val mediaUrl: String?,
    val thumbnailUrl: String?,
    val audioDuration: Int?,
    val status: String, // 'pending', 'sending', 'sent', 'delivered', 'read', 'error'
    val createdAt: Long,
    val deliveredAt: Long?,
    val readAt: Long?
)
