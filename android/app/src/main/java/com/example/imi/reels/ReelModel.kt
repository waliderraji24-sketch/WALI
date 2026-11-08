package com.example.imi.reels

data class ReelModel(
    val id: String = "",
    val creatorId: String = "",
    val creatorName: String = "",
    val creatorAvatar: String? = null,
    val caption: String = "",
    val videoUrl: String = "",
    val thumbnailUrl: String = "",
    var likeCount: Int = 0,
    var commentCount: Int = 0,
    var shareCount: Int = 0,
    var isLikedByMe: Boolean = false,
    val createdAt: Long = System.currentTimeMillis()
)
