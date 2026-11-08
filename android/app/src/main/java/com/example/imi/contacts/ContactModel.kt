package com.example.imi.contacts

data class ContactModel(val uid: String, val displayName: String, val phoneNumber: String?, val photoURL: String?, val isOnline: Boolean = false)
