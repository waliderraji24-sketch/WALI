package com.example.imi.chat

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.imi.R

class MessageAdapter(private val currentUid: String) : ListAdapter<MessageModel, RecyclerView.ViewHolder>(Diff) {
    companion object { 
        private const val OUT = 1
        private const val IN = 2 
    }

    override fun getItemViewType(p: Int) = if (getItem(p).sender == currentUid) OUT else IN

    override fun onCreateViewHolder(p: ViewGroup, t: Int): RecyclerView.ViewHolder {
        val layout = if (t == OUT) R.layout.item_message_outgoing else R.layout.item_message_incoming
        val view = LayoutInflater.from(p.context).inflate(layout, p, false)
        return MessageVH(view, t == OUT)
    }

    override fun onBindViewHolder(h: RecyclerView.ViewHolder, p: Int) {
        (h as MessageVH).bind(getItem(p))
    }

    class MessageVH(v: View, isOutgoing: Boolean) : RecyclerView.ViewHolder(v) {
        private val text: TextView = v.findViewById(if (isOutgoing) R.id.tvOutgoingText else R.id.tvIncomingText)
        private val media: ImageView = v.findViewById(if (isOutgoing) R.id.ivOutgoingMedia else R.id.ivIncomingMedia)

        fun bind(msg: MessageModel) {
            text.text = msg.text
            if (!msg.mediaUrl.isNullOrEmpty()) {
                media.visibility = View.VISIBLE
                Glide.with(itemView).load(msg.mediaUrl).into(media)
            } else {
                media.visibility = View.GONE
            }
        }
    }

    object Diff : DiffUtil.ItemCallback<MessageModel>() {
        override fun areItemsTheSame(o: MessageModel, n: MessageModel) = o.id == n.id
        override fun areContentsTheSame(o: MessageModel, n: MessageModel) = o == n
    }
}
