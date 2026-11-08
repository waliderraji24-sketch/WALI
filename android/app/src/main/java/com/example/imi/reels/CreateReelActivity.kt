package com.example.imi.reels

import android.net.Uri
import android.os.Bundle
import android.view.View
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.example.imi.R
import com.google.android.material.button.MaterialButton
import com.google.android.material.textfield.TextInputEditText
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.storage.FirebaseStorage
import java.util.UUID

class CreateReelActivity : AppCompatActivity() {

    private lateinit var btnSelectVideo: FrameLayout
    private lateinit var layoutPlaceholder: LinearLayout
    private lateinit var tvSelectedNotice: TextView
    private lateinit var etCaption: TextInputEditText
    private lateinit var btnPublish: MaterialButton
    private lateinit var pbLoading: ProgressBar

    private var selectedVideoUri: Uri? = null

    private val auth: FirebaseAuth by lazy { FirebaseAuth.getInstance() }
    private val firestore: FirebaseFirestore by lazy { FirebaseFirestore.getInstance() }
    private val storage: FirebaseStorage by lazy { FirebaseStorage.getInstance() }

    private val pickVideoLauncher = registerForActivityResult(
        ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        if (uri != null) {
            selectedVideoUri = uri
            layoutPlaceholder.visibility = View.GONE
            tvSelectedNotice.visibility = View.VISIBLE
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_reel)

        btnSelectVideo = findViewById(R.id.btnSelectVideo)
        layoutPlaceholder = findViewById(R.id.layoutSelectPlaceholder)
        tvSelectedNotice = findViewById(R.id.tvSelectedVideoNotice)
        etCaption = findViewById(R.id.etReelCaption)
        btnPublish = findViewById(R.id.btnPublishReel)
        pbLoading = findViewById(R.id.pbPublishLoading)

        btnSelectVideo.setOnClickListener {
            pickVideoLauncher.launch("video/*")
        }

        btnPublish.setOnClickListener {
            publishReel()
        }
    }

    private fun publishReel() {
        val uri = selectedVideoUri
        if (uri == null) {
            Toast.makeText(this, "يرجى اختيار مقطع فيديو أولاً", Toast.LENGTH_SHORT).show()
            return
        }

        val caption = etCaption.text?.toString()?.trim() ?: ""
        val user = auth.currentUser ?: return
        val reelId = UUID.randomUUID().toString()
        val videoRef = storage.reference.child("reels_videos/$reelId.mp4")

        setLoading(true)

        videoRef.putFile(uri).continueWithTask { videoRef.downloadUrl }
            .addOnSuccessListener { downloadUrl ->
                val now = System.currentTimeMillis()
                val creatorName = user.displayName ?: "مستخدم IMI"
                val creatorAvatar = user.photoUrl?.toString()

                val reelData = hashMapOf<String, Any>(
                    "id" to reelId,
                    "creatorId" to user.uid,
                    "creatorName" to creatorName,
                    "caption" to caption,
                    "videoUrl" to downloadUrl.toString(),
                    "thumbnailUrl" to "",
                    "likeCount" to 0,
                    "commentCount" to 0,
                    "shareCount" to 0,
                    "likedBy" to emptyList<String>(),
                    "createdAt" to now,
                    "status" to "ready"
                )

                if (creatorAvatar != null) {
                    reelData["creatorAvatar"] = creatorAvatar
                }

                firestore.collection("reels").document(reelId)
                    .set(reelData)
                    .addOnSuccessListener {
                        setLoading(false)
                        Toast.makeText(this, "تم نشر مقطع Reel بنجاح!", Toast.LENGTH_LONG).show()
                        finish()
                    }
                    .addOnFailureListener { e ->
                        setLoading(false)
                        Toast.makeText(this, "فشل حفظ المقطع: ${e.message}", Toast.LENGTH_SHORT).show()
                    }
            }
            .addOnFailureListener { e ->
                setLoading(false)
                Toast.makeText(this, "فشل رفع الفيديو: ${e.message}", Toast.LENGTH_SHORT).show()
            }
    }

    private fun setLoading(loading: Boolean) {
        pbLoading.visibility = if (loading) View.VISIBLE else View.GONE
        btnPublish.isEnabled = !loading
        btnSelectVideo.isEnabled = !loading
    }
}
