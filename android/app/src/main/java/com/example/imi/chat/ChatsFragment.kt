package com.example.imi.chat

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.example.imi.R
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query

class ChatsFragment : Fragment() {
    private lateinit var rv: RecyclerView
    private lateinit var sr: SwipeRefreshLayout
    private lateinit var ad: ChatAdapter
    private val auth by lazy { FirebaseAuth.getInstance() }
    private val db by lazy { FirebaseFirestore.getInstance() }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val v = inflater.inflate(R.layout.fragment_chats, container, false)
        rv = v.findViewById(R.id.rvChatsList)
        sr = v.findViewById(R.id.swipeRefreshChats)
        ad = ChatAdapter { c -> startActivity(Intent(requireContext(), ChatRoomActivity::class.java).apply { putExtra("chatId", c.chatId); putExtra("peerUid", c.peerUid); putExtra("peerName", c.peerName); putExtra("peerAvatar", c.peerAvatar) }) }
        rv.layoutManager = LinearLayoutManager(requireContext())
        rv.adapter = ad
        sr.setOnRefreshListener { load() }
        load()
        return v
    }

    private fun load() {
        val uid = auth.currentUser?.uid ?: return
        sr.isRefreshing = true
        db.collection("chats").whereArrayContains("participants", uid).orderBy("lastMessageTime", Query.Direction.DESCENDING).addSnapshotListener { snap, _ ->
            sr.isRefreshing = false
            val list = mutableListOf<ConversationModel>()
            val docs = snap?.documents ?: return@addSnapshotListener
            if (docs.isEmpty()) { ad.submitList(emptyList()); return@addSnapshotListener }
            docs.forEach { d ->
                val cid = d.id
                val p = d.get("participants") as? List<*> ?: emptyList<String>()
                val peer = p.firstOrNull { it != uid }?.toString() ?: "unknown"
                db.collection("users").document(peer).get().addOnSuccessListener { u ->
                    list.add(ConversationModel(cid, peer, u.getString("displayName") ?: "صديق", u.getString("photoURL"), d.getString("lastMessage") ?: "", d.getLong("lastMessageTime") ?: 0, 0, u.getBoolean("online") ?: false))
                    if (list.size == docs.size) ad.submitList(list.sortedByDescending { it.lastMessageTime })
                }
            }
        }
    }
}
