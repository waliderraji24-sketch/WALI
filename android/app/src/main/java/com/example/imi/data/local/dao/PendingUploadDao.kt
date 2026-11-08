package com.example.imi.data.local.dao

import androidx.room.*
import com.example.imi.data.local.entity.PendingUploadEntity

@Dao
interface PendingUploadDao {
    @Query("SELECT * FROM pending_uploads WHERE chatId = :chatId ORDER BY createdAt ASC")
    suspend fun getUploadsForChat(chatId: String): List<PendingUploadEntity>

    @Query("SELECT * FROM pending_uploads WHERE status IN ('pending', 'failed') ORDER BY createdAt ASC")
    suspend fun getPendingOrFailedUploads(): List<PendingUploadEntity>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUpload(upload: PendingUploadEntity)

    @Query("UPDATE pending_uploads SET progress = :progress, status = :status WHERE uploadId = :uploadId")
    suspend fun updateProgress(uploadId: String, progress: Int, status: String)

    @Query("DELETE FROM pending_uploads WHERE uploadId = :uploadId")
    suspend fun deleteUpload(uploadId: String)
}
