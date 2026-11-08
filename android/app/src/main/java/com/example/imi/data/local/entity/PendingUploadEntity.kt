package com.example.imi.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "pending_uploads")
data class PendingUploadEntity(
    @PrimaryKey
    val uploadId: String,
    val messageId: String,
    val chatId: String,
    val localFilePath: String,
    val mediaType: String, // 'voice', 'image', 'video'
    val duration: Int? = null,
    val progress: Int = 0,
    val status: String = "pending", // 'pending', 'uploading', 'failed', 'completed'
    val createdAt: Long = System.currentTimeMillis()
)
