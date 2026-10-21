import React, { useState, useEffect } from 'react'
import { getAllUsers } from '../../services/lmsService'
import { Users, Search, Shield, UserCheck } from 'lucide-react'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  useEffect(() => {
    getAllUsers().then(setUsers)
  }, [])

  const filtered = users.filter((u) => {
    const matchesSearch = u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
                          u.email?.toLowerCase().includes(search.toLowerCase()) ||
                          u.member_id?.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === 'all' || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#111111] sm:text-3xl">Platform User Directory</h1>
        <p className="mt-1 text-xs text-[#555555]">
          Manage roles, student IDs, teacher accreditation, and account access.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center rounded-2xl border border-white/10 bg-[#121422] p-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#666666]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name, email, member ID..."
            className="w-full rounded-xl border border-white/10 bg-[#0c0e18] py-2 pl-10 pr-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-[#0c0e18] py-2 px-3 text-xs text-[#111111] focus:border-amber-400 focus:outline-none w-full sm:w-auto"
        >
          <option value="all">All Roles</option>
          <option value="student">Students</option>
          <option value="teacher">Teachers</option>
          <option value="admin">Administrators</option>
          <option value="management">Management</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-white/10 bg-[#121422] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/5 text-[#555555] font-semibold uppercase">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Member ID</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-4 flex items-center space-x-3">
                    <img
                      src={u.avatar_url}
                      alt={u.full_name}
                      className="h-8 w-8 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <p className="font-bold text-[#111111]">{u.full_name}</p>
                      <p className="text-[10px] text-[#555555]">{u.email}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-amber-400">{u.member_id || 'N/A'}</td>
                  <td className="py-3.5 px-4">
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase text-[#333333]">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#444444]">{u.country || 'Indonesia'}</td>
                  <td className="py-3.5 px-4 text-right text-emerald-400 font-bold">Active</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

