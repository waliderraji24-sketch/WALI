package com.example.imi.data.local.dao

import androidx.room.*
import com.example.imi.data.local.entity.PendingMessageEntity

@Dao
interface PendingMessageDao {
    @Query("SELECT * FROM pending_messages WHERE chatId = :chatId ORDER BY createdAt ASC")
    suspend fun getPendingForChat(chatId: String): List<PendingMessageEntity>

    @Query("SELECT * FROM pending_messages WHERE status = 'pending' ORDER BY createdAt ASC")
    suspend fun getAllPendingMessages(): List<PendingMessageEntity>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPendingMessage(message: PendingMessageEntity)

    @Query("UPDATE pending_messages SET status = :status, retryCount = retryCount + 1 WHERE messageId = :messageId")
    suspend fun updateStatus(messageId: String, status: String)

    @Query("DELETE FROM pending_messages WHERE messageId = :messageId")
    suspend fun deletePendingMessage(messageId: String)

    @Query("DELETE FROM pending_messages WHERE chatId = :chatId")
    suspend fun clearPendingForChat(chatId: String)
}
