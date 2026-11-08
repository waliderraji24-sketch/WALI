package com.example.imi.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.example.imi.data.local.dao.*
import com.example.imi.data.local.entity.*

@Database(
    entities = [
        MessageEntity::class,
        ConversationEntity::class,
        PendingMessageEntity::class,
        PendingUploadEntity::class,
        UserEntity::class
    ],
    version = 1,
    exportSchema = false
)
abstract class AppDatabase : RoomDatabase() {

    abstract fun messageDao(): MessageDao
    abstract fun conversationDao(): ConversationDao
    abstract fun pendingMessageDao(): PendingMessageDao
    abstract fun pendingUploadDao(): PendingUploadDao
    abstract fun userDao(): UserDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getDatabase(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "imi_local_offline.db"
                )
                    .fallbackToDestructiveMigration()
                    .build()
                INSTANCE = instance
                instance
            }
        }
    }
}
