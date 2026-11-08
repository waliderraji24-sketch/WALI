package com.example.imi

import android.util.Log

object DiagnosticState {
    var lastFcmMessageId: String = "None"
    var lastFcmPayloadKeys: String = "None"
    var lastFcmTimestamp: Long = 0
    var lastNotificationCreated: String = "None"
    var lastIncomingCallReceived: String = "None"
    var lastCallId: String = "None"
    var lastCallerId: String = "None"

    fun logFcm(messageId: String?, keys: String?) {
        lastFcmMessageId = messageId ?: "null"
        lastFcmPayloadKeys = keys ?: "null"
        lastFcmTimestamp = System.currentTimeMillis()
        Log.d("IMI_DIAG", "Logged FCM: $messageId keys: $keys")
    }

    fun logCall(callId: String?, callerId: String?) {
        lastIncomingCallReceived = System.currentTimeMillis().toString()
        lastCallId = callId ?: "null"
        lastCallerId = callerId ?: "null"
    }
}
