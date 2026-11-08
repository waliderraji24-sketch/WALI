package com.example.imi.contacts

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.database.Cursor
import android.provider.ContactsContract
import androidx.core.content.ContextCompat
import com.google.gson.Gson

data class PhoneContact(
    val name: String,
    val phoneNumber: String,
    val photoUri: String? = null
)

class ContactsManager(private val context: Context) {

    fun hasContactsPermission(): Boolean {
        return ContextCompat.checkSelfPermission(
            context,
            Manifest.permission.READ_CONTACTS
        ) == PackageManager.PERMISSION_GRANTED
    }

    /**
     * Reads device contacts safely and normalizes phone numbers to E.164
     */
    fun readDeviceContacts(): List<PhoneContact> {
        if (!hasContactsPermission()) {
            return emptyList()
        }

        val contactsList = mutableListOf<PhoneContact>()
        val seenNumbers = HashSet<String>()

        val projection = arrayOf(
            ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME,
            ContactsContract.CommonDataKinds.Phone.NUMBER,
            ContactsContract.CommonDataKinds.Phone.PHOTO_URI
        )

        var cursor: Cursor? = null
        try {
            cursor = context.contentResolver.query(
                ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                projection,
                null,
                null,
                "${ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME} ASC"
            )

            cursor?.let {
                val nameIdx = it.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME)
                val numberIdx = it.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER)
                val photoIdx = it.getColumnIndex(ContactsContract.CommonDataKinds.Phone.PHOTO_URI)

                while (it.moveToNext()) {
                    val name = if (nameIdx != -1) it.getString(nameIdx) ?: "Unknown" else "Unknown"
                    val rawNumber = if (numberIdx != -1) it.getString(numberIdx) ?: "" else ""
                    val photoUri = if (photoIdx != -1) it.getString(photoIdx) else null

                    val normalized = normalizePhoneNumber(rawNumber)
                    if (normalized.length >= 7 && !seenNumbers.contains(normalized)) {
                        seenNumbers.add(normalized)
                        contactsList.add(PhoneContact(name, normalized, photoUri))
                    }
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        } finally {
            cursor?.close()
        }

        return contactsList
    }

    fun getDeviceContactsJson(): String {
        val contacts = readDeviceContacts()
        return Gson().toJson(contacts)
    }

    private fun normalizePhoneNumber(raw: String): String {
        // Strip out all non-digit and non-plus characters
        var cleaned = raw.replace(Regex("[^0-9+]"), "")
        if (cleaned.startsWith("00")) {
            cleaned = "+" + cleaned.substring(2)
        }

        // Handle Morocco local phone prefixes (06, 07, 05) -> +2126..., +2127..., +2125...
        if ((cleaned.startsWith("06") || cleaned.startsWith("07") || cleaned.startsWith("05")) && cleaned.length == 10) {
            cleaned = "+212" + cleaned.substring(1)
        } else if (cleaned.startsWith("212") && !cleaned.startsWith("+")) {
            cleaned = "+$cleaned"
        } else if (cleaned.startsWith("0") && cleaned.length == 10 && !cleaned.startsWith("+")) {
            // Default generic local 0-prefix to +212 if Moroccan format
            cleaned = "+212" + cleaned.substring(1)
        }
        return cleaned
    }
}
