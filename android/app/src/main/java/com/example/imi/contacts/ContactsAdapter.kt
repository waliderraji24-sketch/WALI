package com.example.imi.contacts

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.imi.R

class ContactsAdapter : ListAdapter<ContactModel, ContactsAdapter.VH>(Diff) {
    class VH(v: View) : RecyclerView.ViewHolder(v) {
        val n: TextView = v.findViewById(R.id.tvContactName)
        fun b(i: ContactModel) { n.text = i.displayName }
    }
    override fun onCreateViewHolder(p: ViewGroup, t: Int) = VH(LayoutInflater.from(p.context).inflate(R.layout.item_contact, p, false))
    override fun onBindViewHolder(h: VH, p: Int) = h.b(getItem(p))
    companion object Diff : DiffUtil.ItemCallback<ContactModel>() {
        override fun areItemsTheSame(o: ContactModel, n: ContactModel) = o.uid == n.uid
        override fun areContentsTheSame(o: ContactModel, n: ContactModel) = o == n
    }
}
