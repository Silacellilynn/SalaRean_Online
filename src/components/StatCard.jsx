import React from 'react'

export default function StatCard({ title, value, icon: Icon, trend, subtitle, color = 'gold' }) {
  const colorMap = {
    gold: 'border-amber-500/20 text-amber-400 bg-amber-500/10',
    red: 'border-red-500/20 text-red-400 bg-red-500/10',
    blue: 'border-cyan-500/20 text-cyan-400 bg-cyan-500/10',
    green: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/10',
    purple: 'border-purple-500/20 text-purple-400 bg-purple-500/10',
  }

  const iconStyle = colorMap[color] || colorMap.gold

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#141622] p-5 shadow-xl transition-all duration-300 hover:border-amber-500/30 hover:shadow-amber-500/5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">{title}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-white lg:text-3xl">{value}</h3>
          {subtitle && <p className="mt-1 text-xs text-gray-400">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`rounded-lg border p-3 ${iconStyle}`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-3 flex items-center text-xs font-medium text-emerald-400">
          <span>{trend}</span>
          <span className="ml-1.5 text-gray-400">vs last period</span>
        </div>
      )}
    </div>
  )
}
