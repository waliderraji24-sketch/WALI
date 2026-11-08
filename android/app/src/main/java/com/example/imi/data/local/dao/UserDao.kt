package com.example.imi.data.local.dao

import androidx.room.*
import com.example.imi.data.local.entity.UserEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface UserDao {
    @Query("SELECT * FROM cached_users WHERE userId = :userId LIMIT 1")
    suspend fun getUserById(userId: String): UserEntity?

    @Query("SELECT * FROM cached_users")
    fun getAllUsers(): Flow<List<UserEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdateUser(user: UserEntity)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUsers(users: List<UserEntity>)

    @Query("DELETE FROM cached_users WHERE userId = :userId")
    suspend fun deleteUser(userId: String)
}
