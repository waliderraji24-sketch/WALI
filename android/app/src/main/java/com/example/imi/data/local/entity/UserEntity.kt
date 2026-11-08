package com.example.imi.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "cached_users")
data class UserEntity(
    @PrimaryKey
    val userId: String,
    val displayName: String?,
    val phoneNumber: String?,
    val photoURL: String?,
    val bio: String?,
    val online: Boolean = false,
    val lastSeen: Long = 0,
    val cachedAt: Long = System.currentTimeMillis()
)
