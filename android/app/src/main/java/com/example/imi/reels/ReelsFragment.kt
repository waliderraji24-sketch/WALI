package com.example.imi.reels

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.viewpager2.widget.ViewPager2
import com.example.imi.R
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query

class ReelsFragment : Fragment() {
    private lateinit var vp: ViewPager2
    private lateinit var ad: ReelsAdapter
    private val db by lazy { FirebaseFirestore.getInstance() }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val v = inflater.inflate(R.layout.fragment_reels, container, false)
        vp = v.findViewById(R.id.viewPagerReels)
        ad = ReelsAdapter()
        vp.adapter = ad
        load()
        return v
    }

    private fun load() {
        db.collection("reels").orderBy("createdAt", Query.Direction.DESCENDING).addSnapshotListener { snap, _ ->
            val list = snap?.documents?.mapNotNull { d -> ReelModel(d.id, d.getString("creatorId") ?: "", d.getString("creatorName") ?: "", null, d.getString("caption") ?: "", d.getString("videoUrl") ?: "", "", 0, 0, 0, false, d.getLong("createdAt") ?: 0) } ?: return@addSnapshotListener
            ad.submitList(list)
        }
    }
}
