package com.example.imi.reels

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.media3.common.MediaItem
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.imi.R

class ReelsAdapter : ListAdapter<ReelModel, ReelsAdapter.VH>(Diff) {

    class VH(v: View) : RecyclerView.ViewHolder(v) {
        val playerView: PlayerView = v.findViewById(R.id.playerView)
        val tvUsername: TextView = v.findViewById(R.id.tvReelUsername)
        val tvCaption: TextView = v.findViewById(R.id.tvReelCaption)
        var player: ExoPlayer? = null

        fun b(i: ReelModel) {
            tvUsername.text = "@${i.creatorName}"
            tvCaption.text = i.caption
            
            player?.release()
            player = ExoPlayer.Builder(itemView.context).build().apply {
                playerView.player = this
                repeatMode = ExoPlayer.REPEAT_MODE_ONE
                setMediaItem(MediaItem.fromUri(i.videoUrl))
                prepare()
                playWhenReady = true
            }
        }

        fun release() {
            player?.release()
            player = null
        }
    }

    override fun onCreateViewHolder(p: ViewGroup, t: Int) = VH(LayoutInflater.from(p.context).inflate(R.layout.item_reel, p, false))
    override fun onBindViewHolder(h: VH, p: Int) = h.b(getItem(p))
    
    override fun onViewRecycled(h: VH) {
        super.onViewRecycled(h)
        h.release()
    }

    companion object Diff : DiffUtil.ItemCallback<ReelModel>() {
        override fun areItemsTheSame(o: ReelModel, n: ReelModel) = o.id == n.id
        override fun areContentsTheSame(o: ReelModel, n: ReelModel) = o == n
    }
}
