package com.example.imi.data.local.dao

import androidx.room.*
import com.example.imi.data.local.entity.MessageEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface MessageDao {
    @Query("SELECT * FROM messages WHERE chatId = :chatId ORDER BY createdAt ASC")
    fun getMessagesForChat(chatId: String): Flow<List<MessageEntity>>

    @Query("SELECT * FROM messages WHERE chatId = :chatId ORDER BY createdAt ASC")
    suspend fun getMessagesForChatSync(chatId: String): List<MessageEntity>

    @Query("SELECT * FROM messages WHERE messageId = :messageId LIMIT 1")
    suspend fun getMessageById(messageId: String): MessageEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdateMessage(message: MessageEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMessages(messages: List<MessageEntity>)

    @Query("UPDATE messages SET status = :status WHERE messageId = :messageId")
    suspend fun updateMessageStatus(messageId: String, status: String)

    @Query("UPDATE messages SET status = 'delivered', deliveredAt = :deliveredAt WHERE chatId = :chatId AND status = 'sent' AND senderId != :currentUserId")
    suspend fun markChatDelivered(chatId: String, currentUserId: String, deliveredAt: Long)

    @Query("UPDATE messages SET status = 'read', readAt = :readAt WHERE chatId = :chatId AND senderId != :currentUserId")
    suspend fun markChatRead(chatId: String, currentUserId: String, readAt: Long)

    @Query("DELETE FROM messages WHERE messageId = :messageId")
    suspend fun deleteMessage(messageId: String)

    @Query("DELETE FROM messages WHERE chatId = :chatId")
    suspend fun clearChatMessages(chatId: String)
}
