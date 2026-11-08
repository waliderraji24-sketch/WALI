package com.example.imi

import android.app.Application
import android.app.NotificationChannel
import android.app.NotificationManager
import android.media.AudioAttributes
import android.media.RingtoneManager
import android.os.Build
import androidx.work.Constraints
import androidx.work.ExistingPeriodicWorkPolicy
import androidx.work.NetworkType
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import com.example.imi.data.local.AppDatabase
import com.example.imi.sync.OfflineSyncWorker
import java.util.concurrent.TimeUnit

class ImiApplication : Application() {

    lateinit var database: AppDatabase
        private set

    override fun onCreate() {
        super.onCreate()
        instance = this

        // 1. Initialize Room Local Database
        database = AppDatabase.getDatabase(this)

        // 2. Setup Notification Channels
        createNotificationChannels()

        // 3. Schedule Background Sync Worker for offline messages
        scheduleOfflineSyncWorker()
    }

    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val notificationManager = getSystemService(NotificationManager::class.java)

            // Message Notifications Channel (Debug v3)
            val msgChannel = NotificationChannel(
                CHANNEL_MESSAGES_ID,
                "IMI Messages Debug",
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "IMI Chat Message Notifications Channel"
                enableVibration(true)
                setShowBadge(true)
                setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION), AudioAttributes.Builder()
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .setUsage(AudioAttributes.USAGE_NOTIFICATION)
                    .build())
            }

            // Calls Notifications Channel (Debug v3)
            val callRingtoneUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE)
            val audioAttributes = AudioAttributes.Builder()
                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .setUsage(AudioAttributes.USAGE_NOTIFICATION_RINGTONE)
                .build()

            val callChannel = NotificationChannel(
                CHANNEL_CALLS_ID,
                "IMI Calls Debug",
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "IMI Incoming Call Notifications Channel"
                setSound(callRingtoneUri, audioAttributes)
                enableVibration(true)
                vibrationPattern = longArrayOf(0, 1000, 500, 1000, 500, 1000)
                setShowBadge(true)
            }

            notificationManager.createNotificationChannel(msgChannel)
            notificationManager.createNotificationChannel(callChannel)
        }
    }

    private fun scheduleOfflineSyncWorker() {
        val constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .build()

        val syncRequest = PeriodicWorkRequestBuilder<OfflineSyncWorker>(15, TimeUnit.MINUTES)
            .setConstraints(constraints)
            .build()

        WorkManager.getInstance(this).enqueueUniquePeriodicWork(
            "ImiOfflineSyncWork",
            ExistingPeriodicWorkPolicy.KEEP,
            syncRequest
        )
    }

    companion object {
        const val CHANNEL_MESSAGES_ID = "imi_messages_debug_v3"
        const val CHANNEL_CALLS_ID = "imi_calls_debug_v3"

        lateinit var instance: ImiApplication
            private set
    }
}
