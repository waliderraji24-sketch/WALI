package com.example.imi.sync

import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.example.imi.data.local.AppDatabase
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class OfflineSyncWorker(
    appContext: Context,
    workerParams: WorkerParameters
) : CoroutineWorker(appContext, workerParams) {

    override suspend fun doWork(): Result = withContext(Dispatchers.IO) {
        try {
            val db = AppDatabase.getDatabase(applicationContext)
            val pendingDao = db.pendingMessageDao()
            val pendingUploadDao = db.pendingUploadDao()

            val pendingMessages = pendingDao.getAllPendingMessages()
            val pendingUploads = pendingUploadDao.getPendingOrFailedUploads()

            // In background, notify or keep records ready for foreground WebView synchronization
            if (pendingMessages.isNotEmpty() || pendingUploads.isNotEmpty()) {
                // Log sync availability
                android.util.Log.d("OfflineSyncWorker", "Found ${pendingMessages.size} pending messages and ${pendingUploads.size} pending uploads.")
            }

            Result.success()
        } catch (e: Exception) {
            e.printStackTrace()
            Result.retry()
        }
    }
}
