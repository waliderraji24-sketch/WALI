package com.example.imi.data.local.dao

import androidx.room.*
import com.example.imi.data.local.entity.ConversationEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface ConversationDao {
    @Query("SELECT * FROM conversations ORDER BY lastMessageTime DESC")
    fun getAllConversations(): Flow<List<ConversationEntity>>

    @Query("SELECT * FROM conversations ORDER BY lastMessageTime DESC")
    suspend fun getAllConversationsSync(): List<ConversationEntity>

    @Query("SELECT * FROM conversations WHERE chatId = :chatId LIMIT 1")
    suspend fun getConversationById(chatId: String): ConversationEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdate(conversation: ConversationEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(conversations: List<ConversationEntity>)

    @Query("DELETE FROM conversations WHERE chatId = :chatId")
    suspend fun deleteConversation(chatId: String)
}
