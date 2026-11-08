package com.example.imi.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "pending_messages")
data class PendingMessageEntity(
    @PrimaryKey
    val messageId: String,
    val chatId: String,
    val senderId: String,
    val receiverId: String?,
    val type: String,
    val text: String?,
    val localFilePath: String?,
    val duration: Int?,
    val status: String = "pending",
    val retryCount: Int = 0,
    val createdAt: Long = System.currentTimeMillis()
)
