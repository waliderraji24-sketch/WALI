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
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class ChatAdapter(private val onClick: (ConversationModel) -> Unit) : ListAdapter<ConversationModel, ChatAdapter.VH>(Diff) {
    class VH(v: View, private val onClick: (ConversationModel) -> Unit) : RecyclerView.ViewHolder(v) {
        val n: TextView = v.findViewById(R.id.tvConvName)
        val m: TextView = v.findViewById(R.id.tvConvLastMessage)
        val t: TextView = v.findViewById(R.id.tvConvTime)
        val a: ImageView = v.findViewById(R.id.ivConvAvatar)
        val d: View = v.findViewById(R.id.viewOnlineDot)
        fun b(i: ConversationModel) {
            n.text = i.peerName; m.text = i.lastMessage
            d.visibility = if (i.isOnline) View.VISIBLE else View.GONE
            if (i.lastMessageTime > 0) t.text = SimpleDateFormat("h:mm a", Locale.getDefault()).format(Date(i.lastMessageTime))
            Glide.with(itemView.context).load(i.peerAvatar).placeholder(R.mipmap.ic_launcher).circleCrop().into(a)
            itemView.setOnClickListener { onClick(i) }
        }
    }
    override fun onCreateViewHolder(p: ViewGroup, t: Int) = VH(LayoutInflater.from(p.context).inflate(R.layout.item_conversation, p, false), onClick)
    override fun onBindViewHolder(h: VH, p: Int) = h.b(getItem(p))
    companion object Diff : DiffUtil.ItemCallback<ConversationModel>() {
        override fun areItemsTheSame(o: ConversationModel, n: ConversationModel) = o.chatId == n.chatId
        override fun areContentsTheSame(o: ConversationModel, n: ConversationModel) = o == n
    }
}
