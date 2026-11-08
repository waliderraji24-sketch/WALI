package com.example.imi.bridge

import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.webkit.JavascriptInterface
import androidx.core.app.NotificationCompat
import com.example.imi.ImiApplication
import com.example.imi.MainActivity
import com.example.imi.R
import com.example.imi.call.IncomingCallActivity
import com.example.imi.contacts.ContactsManager
import com.example.imi.data.local.AppDatabase
import com.example.imi.data.local.entity.PendingMessageEntity
import com.google.firebase.messaging.FirebaseMessaging
import com.google.gson.Gson
import com.google.gson.JsonObject
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

class WebAppInterface(private val activity: MainActivity) {

    private val context: Context = activity.applicationContext
    private val contactsManager = ContactsManager(context)
    private val database = AppDatabase.getDatabase(context)
    private val gson = Gson()
    private var cachedFcmToken: String? = null

    init {
        // Pre-fetch FCM token
        FirebaseMessaging.getInstance().token.addOnCompleteListener { task ->
            if (task.isSuccessful) {
                cachedFcmToken = task.result
            }
        }
    }

    @JavascriptInterface
    fun isNativeApp(): Boolean = true

    @JavascriptInterface
    fun getFcmToken(): String {
        return cachedFcmToken ?: ""
    }

    @JavascriptInterface
    fun getNetworkStatus(): Boolean {
        val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val network = connectivityManager.activeNetwork ?: return false
        val capabilities = connectivityManager.getNetworkCapabilities(network) ?: return false
        return capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    }

    @JavascriptInterface
    fun requestContacts(): String {
        return contactsManager.getDeviceContactsJson()
    }

    @JavascriptInterface
    fun requestContactsPermission(): Boolean {
        activity.runOnUiThread {
            activity.checkAndRequestContactsPermission()
        }
        return contactsManager.hasContactsPermission()
    }

    @JavascriptInterface
    fun showNotification(title: String, body: String, jsonPayload: String?) {
        val intent = Intent(context, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
            if (!jsonPayload.isNullOrBlank()) {
                putExtra("payload", jsonPayload)
            }
        }

        val pendingIntent = PendingIntent.getActivity(
            context,
            System.currentTimeMillis().toInt(),
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val notification = NotificationCompat.Builder(context, ImiApplication.CHANNEL_MESSAGES_ID)
            .setSmallIcon(R.mipmap.ic_launcher)
            .setContentTitle(title)
            .setContentText(body)
            .setAutoCancel(true)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setContentIntent(pendingIntent)
            .build()

        val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.notify((System.currentTimeMillis() % 100000).toInt(), notification)
    }

    @JavascriptInterface
    fun startCallRingtone(callerName: String, callType: String, callId: String) {
        val intent = Intent(context, IncomingCallActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
            putExtra("callId", callId)
            putExtra("callerName", callerName)
            putExtra("callType", callType)
        }
        context.startActivity(intent)
    }

    @JavascriptInterface
    fun stopCallRingtone() {
        IncomingCallActivity.dismissActiveCall()
    }

    @JavascriptInterface
    fun setCallAudioMode(callType: String, isSpeaker: Boolean) {
        activity.startCallAudioRouting(callType, isSpeaker)
    }

    @JavascriptInterface
    fun setSpeakerphone(isSpeaker: Boolean) {
        activity.setSpeakerphoneOn(isSpeaker)
    }

    @JavascriptInterface
    fun resetCallAudioMode() {
        activity.stopCallAudioRouting()
    }

    @JavascriptInterface
    fun savePendingMessage(jsonMessage: String): Boolean {
        return try {
            val obj = gson.fromJson(jsonMessage, JsonObject::class.java)
            val messageId = obj.get("messageId").asString
            val chatId = obj.get("chatId").asString
            val senderId = obj.get("senderId").asString
            val receiverId = if (obj.has("receiverId")) obj.get("receiverId").asString else null
            val type = if (obj.has("type")) obj.get("type").asString else "text"
            val text = if (obj.has("text") && !obj.get("text").isJsonNull) obj.get("text").asString else null
            val duration = if (obj.has("duration") && !obj.get("duration").isJsonNull) obj.get("duration").asInt else null

            val entity = PendingMessageEntity(
                messageId = messageId,
                chatId = chatId,
                senderId = senderId,
                receiverId = receiverId,
                type = type,
                text = text,
                localFilePath = null,
                duration = duration,
                status = "pending",
                createdAt = System.currentTimeMillis()
            )

            CoroutineScope(Dispatchers.IO).launch {
                database.pendingMessageDao().insertPendingMessage(entity)
            }
            true
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }


    @JavascriptInterface
    fun getAndroidDiagnostics(): String {
        val result = JsonObject()
        result.addProperty("packageName", context.packageName)
        result.addProperty("fcmToken", cachedFcmToken ?: "null")
        result.addProperty("lastFcmMessageId", com.example.imi.DiagnosticState.lastFcmMessageId)
        result.addProperty("lastFcmPayloadKeys", com.example.imi.DiagnosticState.lastFcmPayloadKeys)
        result.addProperty("lastFcmTimestamp", com.example.imi.DiagnosticState.lastFcmTimestamp)
        result.addProperty("lastNotificationCreated", com.example.imi.DiagnosticState.lastNotificationCreated)
        result.addProperty("lastIncomingCallReceived", com.example.imi.DiagnosticState.lastIncomingCallReceived)
        result.addProperty("lastCallId", com.example.imi.DiagnosticState.lastCallId)
        result.addProperty("lastCallerId", com.example.imi.DiagnosticState.lastCallerId)
        
        val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            val msgChannel = notificationManager.getNotificationChannel(ImiApplication.CHANNEL_MESSAGES_ID)
            result.addProperty("msgChannelId", msgChannel?.id ?: "null")
            result.addProperty("msgChannelImportance", msgChannel?.importance?.toString() ?: "null")
            result.addProperty("msgChannelSound", msgChannel?.sound?.toString() ?: "null")
            
            val callChannel = notificationManager.getNotificationChannel(ImiApplication.CHANNEL_CALLS_ID)
            result.addProperty("callChannelId", callChannel?.id ?: "null")
            result.addProperty("callChannelImportance", callChannel?.importance?.toString() ?: "null")
            result.addProperty("callChannelSound", callChannel?.sound?.toString() ?: "null")
        }
        
        val postNotificationGranted = if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.TIRAMISU) {
            androidx.core.content.ContextCompat.checkSelfPermission(context, android.Manifest.permission.POST_NOTIFICATIONS) == android.content.pm.PackageManager.PERMISSION_GRANTED
        } else {
            true
        }
        result.addProperty("postNotificationGranted", postNotificationGranted)

        val canUseFullScreen = if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
            notificationManager.canUseFullScreenIntent()
        } else {
            true
        }
        result.addProperty("canUseFullScreenIntent", canUseFullScreen)


        return gson.toJson(result)
    }

    @JavascriptInterface
    fun testLocalNotification() {
        val intent = Intent(context, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
        }
        val pendingIntent = PendingIntent.getActivity(
            context,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        val notification = NotificationCompat.Builder(context, ImiApplication.CHANNEL_MESSAGES_ID)
            .setSmallIcon(R.mipmap.ic_launcher)
            .setContentTitle("TEST LOCAL")
            .setContentText("Testing local notification sound")
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
            .build()
        val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.notify(9999, notification)
    }

    @JavascriptInterface
    fun testIncomingCall() {
        val intent = Intent(context, IncomingCallActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
            putExtra("callId", "test_call_123")
            putExtra("callerId", "test_caller")
            putExtra("callerName", "TEST CALLER")
            putExtra("callerAvatar", "")
            putExtra("callType", "voice")
        }
        context.startActivity(intent)
    }

    @JavascriptInterface
    fun getPendingMessages(chatId: String): String {
        return runBlocking(Dispatchers.IO) {
            try {
                val list = database.pendingMessageDao().getPendingForChat(chatId)
                gson.toJson(list)
            } catch (e: Exception) {
                "[]"
            }
        }
    }

    @JavascriptInterface
    fun deletePendingMessage(messageId: String): Boolean {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                database.pendingMessageDao().deletePendingMessage(messageId)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
        return true
    }
}
