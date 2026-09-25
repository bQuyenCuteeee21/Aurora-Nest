'use client'

import { useMemo, useState } from 'react'
import {
  Bell,
  BedDouble,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  Coffee,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users,
  Utensils,
  X,
} from 'lucide-react'

const rooms = [
  { id: '101', name: 'Standard King', guest: 'Nguyễn Minh Anh', price: '850.000đ', status: 'Đang ở', tone: 'occupied' },
  { id: '102', name: 'Standard Twin', guest: '—', price: '780.000đ', status: 'Trống', tone: 'available' },
  { id: '103', name: 'Deluxe Garden', guest: 'Trần Hoàng Nam', price: '1.250.000đ', status: 'Đang ở', tone: 'occupied' },
  { id: '104', name: 'Deluxe Garden', guest: '—', price: '1.250.000đ', status: 'Dọn phòng', tone: 'cleaning' },
  { id: '201', name: 'Family Suite', guest: 'Lê Thu Hà', price: '2.100.000đ', status: 'Đang ở', tone: 'occupied' },
  { id: '202', name: 'Family Suite', guest: '—', price: '2.100.000đ', status: 'Bảo trì', tone: 'maintenance' },
]

const revenue = [42, 58, 47, 66, 61, 74, 69, 82, 77, 91, 84, 96]

export default function Page() {
  const [active, setActive] = useState('Tổng quan')
  const [showMenu, setShowMenu] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState('')

  const filteredRooms = useMemo(() => rooms.filter((room) =>
    `${room.id} ${room.name} ${room.guest}`.toLowerCase().includes(query.toLowerCase())
  ), [query])

  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#17212b]">
      <aside className={`fixed inset-y-0 left-0 z-40 w-[248px] border-r border-slate-200 bg-white px-5 py-6 transition-transform lg:translate-x-0 ${showMenu ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#123f50] text-white shadow-sm"><BedDouble size={21} /></div>
            <div><p className="text-[15px] font-bold tracking-tight">HTT19 Stay</p><p className="text-[11px] text-slate-400">Hotel & Homestay</p></div>
          </div>
          <button className="lg:hidden" onClick={() => setShowMenu(false)} aria-label="Đóng menu"><X size={19} /></button>
        </div>
        <p className="mb-3 mt-10 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Quản lý</p>
        <nav className="space-y-1">
          {[
            [LayoutDashboard, 'Tổng quan'], [CalendarDays, 'Đặt phòng'], [BedDouble, 'Phòng'], [Users, 'Khách hàng'], [Utensils, 'Dịch vụ'], [CircleDollarSign, 'Doanh thu'],
          ].map(([Icon, label]) => <button key={label as string} onClick={() => { setActive(label as string); setShowMenu(false) }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-medium transition ${active === label ? 'bg-[#e8f2f2] text-[#12626b]' : 'text-slate-500 hover:bg-slate-50'}`}><Icon size={17} strokeWidth={1.8} /><span>{label as string}</span>{label === 'Đặt phòng' && <span className="ml-auto rounded-full bg-[#d8e9e9] px-2 py-0.5 text-[10px] text-[#12626b]">12</span>}</button>)}
        </nav>
        <p className="mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Hệ thống</p>
        <button onClick={() => notify('Mở cài đặt hệ thống')} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-medium text-slate-500 hover:bg-slate-50"><Settings size={17} strokeWidth={1.8} />Cài đặt</button>
        <div className="absolute bottom-6 left-5 right-5 rounded-2xl bg-[#f3f7f7] p-4"><div className="mb-3 flex items-center gap-2"><div className="flex size-8 items-center justify-center rounded-full bg-[#d0e5e4] text-xs font-bold text-[#12626b]">BQ</div><div><p className="text-xs font-semibold">Bích Quyên</p><p className="text-[10px] text-slate-400">Quản trị viên</p></div></div><button onClick={() => notify('Đã đăng xuất')} className="flex items-center gap-2 text-[11px] font-medium text-slate-500"><LogOut size={14} /> Đăng xuất</button></div>
      </aside>

      <section className="lg:pl-[248px]">
        <header className="flex h-[76px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
          <div className="flex items-center gap-3"><button className="lg:hidden" onClick={() => setShowMenu(true)} aria-label="Mở menu"><Menu size={21} /></button><div><p className="text-[11px] text-slate-400">Thứ Tư, 25 tháng 9, 2026</p><h1 className="mt-1 text-lg font-bold tracking-tight">Tổng quan</h1></div></div>
          <div className="flex items-center gap-3"><button onClick={() => notify('Bạn không có thông báo mới')} className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-50" aria-label="Thông báo"><Bell size={19} /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[#e98063]" /></button><div className="hidden h-8 w-px bg-slate-200 sm:block" /><div className="hidden items-center gap-2 sm:flex"><div className="flex size-8 items-center justify-center rounded-full bg-[#d0e5e4] text-xs font-bold text-[#12626b]">BQ</div><span className="text-xs font-semibold">Bích Quyên</span><ChevronDown size={14} className="text-slate-400" /></div></div>
        </header>

        <div className="mx-auto max-w-[1400px] px-5 py-6 sm:px-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-slate-500">Chào buổi sáng, Bích Quyên</p><h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-[28px]">Hôm nay có gì mới?</h2></div><button onClick={() => setShowBooking(true)} className="flex w-fit items-center gap-2 rounded-xl bg-[#123f50] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0d3342]"><Plus size={16} /> Tạo đặt phòng</button></div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[[CircleDollarSign, 'Doanh thu tháng này', '186.450.000đ', '+12,8%', 'so với tháng trước', 'teal'], [ClipboardList, 'Đặt phòng hôm nay', '12', '+3', 'so với hôm qua', 'blue'], [BedDouble, 'Công suất phòng', '78,4%', '+5,2%', 'so với tháng trước', 'orange'], [Users, 'Khách đang lưu trú', '34', '+8', 'khách mới hôm nay', 'purple']].map(([Icon, title, value, change, sub, tone]) => <div key={title as string} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_rgba(20,34,44,0.03)]"><div className="flex items-start justify-between"><div className={`flex size-9 items-center justify-center rounded-xl ${tone === 'teal' ? 'bg-[#e3f2ef] text-[#16806e]' : tone === 'blue' ? 'bg-[#e8f0fb] text-[#4171ae]' : tone === 'orange' ? 'bg-[#fff0e5] text-[#dc8753]' : 'bg-[#f0eafa] text-[#8563b8]'}`}><Icon size={18} /></div><span className="rounded-full bg-[#e8f5ee] px-2 py-1 text-[10px] font-semibold text-[#32916b]">{change}</span></div><p className="mt-5 text-xs text-slate-500">{title}</p><p className="mt-1 text-xl font-bold tracking-tight">{value}</p><p className="mt-1 text-[10px] text-slate-400">{sub}</p></div>)}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_rgba(20,34,44,0.03)]"><div className="flex items-center justify-between"><div><h3 className="text-sm font-bold">Doanh thu</h3><p className="mt-1 text-[11px] text-slate-400">Tháng 9, 2026</p></div><button onClick={() => notify('Đang xem báo cáo doanh thu')} className="rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-medium text-slate-500">Xem báo cáo</button></div><div className="mt-6 flex h-[170px] items-end gap-1 sm:gap-3">{revenue.map((height, index) => <div key={index} className="group flex flex-1 flex-col items-center gap-2"><div className={`relative w-full rounded-t-md transition hover:bg-[#123f50] ${index === 11 ? 'bg-[#123f50]' : 'bg-[#d9e9e8]'}`} style={{ height: `${height}%` }}><span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-[#17212b] px-2 py-1 text-[9px] text-white group-hover:block">{height * 2}tr</span></div><span className="text-[9px] text-slate-400">{['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'][index]}</span></div>)}</div></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_rgba(20,34,44,0.03)]"><div className="flex items-center justify-between"><div><h3 className="text-sm font-bold">Tình trạng phòng</h3><p className="mt-1 text-[11px] text-slate-400">Tổng cộng 48 phòng</p></div><MoreHorizontal size={18} className="text-slate-400" /></div><div className="mt-6 flex items-center gap-5"><div className="relative flex size-32 shrink-0 items-center justify-center rounded-full" style={{ background: 'conic-gradient(#123f50 0 78%, #e8a36f 78% 87%, #d9e9e8 87% 96%, #e6e8ec 96% 100%)' }}><div className="flex size-[92px] flex-col items-center justify-center rounded-full bg-white"><strong className="text-xl">78%</strong><span className="text-[10px] text-slate-400">đang sử dụng</span></div></div><div className="space-y-3 text-[11px] text-slate-500"><p><i className="mr-2 inline-block size-2 rounded-full bg-[#123f50]" />Đang ở <b className="ml-2 text-slate-700">38</b></p><p><i className="mr-2 inline-block size-2 rounded-full bg-[#e8a36f]" />Dọn phòng <b className="ml-2 text-slate-700">4</b></p><p><i className="mr-2 inline-block size-2 rounded-full bg-[#d9e9e8]" />Trống <b className="ml-2 text-slate-700">5</b></p><p><i className="mr-2 inline-block size-2 rounded-full bg-[#e6e8ec]" />Bảo trì <b className="ml-2 text-slate-700">1</b></p></div></div></div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_rgba(20,34,44,0.03)]"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h3 className="text-sm font-bold">Danh sách phòng</h3><p className="mt-1 text-[11px] text-slate-400">Theo dõi trạng thái phòng hôm nay</p></div><div className="flex items-center gap-2"><div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2"><Search size={14} className="text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent text-xs outline-none placeholder:text-slate-400 sm:w-40" placeholder="Tìm phòng, khách..." /></div><button onClick={() => notify('Đã mở bộ lọc phòng')} className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-500">Lọc</button></div></div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[650px] text-left text-xs"><thead className="border-y border-slate-100 text-[10px] uppercase tracking-wider text-slate-400"><tr><th className="py-3 font-semibold">Phòng</th><th className="py-3 font-semibold">Loại phòng</th><th className="py-3 font-semibold">Khách hiện tại</th><th className="py-3 font-semibold">Giá / đêm</th><th className="py-3 font-semibold">Trạng thái</th><th /></tr></thead><tbody className="divide-y divide-slate-100">{filteredRooms.map((room) => <tr key={room.id} className="hover:bg-slate-50"><td className="py-3 font-bold">{room.id}</td><td className="py-3 text-slate-600">{room.name}</td><td className="py-3 text-slate-600">{room.guest}</td><td className="py-3 text-slate-600">{room.price}</td><td className="py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${room.tone === 'occupied' ? 'bg-[#e8f0fb] text-[#4171ae]' : room.tone === 'available' ? 'bg-[#e8f5ee] text-[#32916b]' : room.tone === 'cleaning' ? 'bg-[#fff0e5] text-[#c77b46]' : 'bg-slate-100 text-slate-500'}`}>{room.status}</span></td><td className="py-3 text-right"><button onClick={() => notify(`Đã mở chi tiết phòng ${room.id}`)} aria-label={`Chi tiết phòng ${room.id}`}><MoreHorizontal size={16} className="text-slate-400" /></button></td></tr>)}</tbody></table></div></div>
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#d8ecea] bg-[#edf8f6] p-4"><div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#16806e]"><Sparkles size={18} /></div><div><p className="text-xs font-bold text-[#12626b]">Gợi ý từ HTT19</p><p className="mt-1 text-[11px] text-[#4f7777]">Công suất phòng cuối tuần đang tăng 18%. Hãy cân nhắc điều chỉnh giá phòng Deluxe.</p></div><button onClick={() => notify('Đã xem gợi ý điều chỉnh giá')} className="ml-auto hidden rounded-lg bg-white px-3 py-2 text-[10px] font-semibold text-[#12626b] sm:block">Xem ngay</button></div>
        </div>
      </section>

      {toast && <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-[#17212b] px-4 py-3 text-xs font-medium text-white shadow-lg">{toast}</div>}
      {showBooking && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"><div className="flex items-center justify-between"><div><h3 className="font-bold">Tạo đặt phòng mới</h3><p className="mt-1 text-xs text-slate-400">Nhập thông tin đặt phòng</p></div><button onClick={() => setShowBooking(false)} aria-label="Đóng"><X size={18} /></button></div><div className="mt-5 space-y-3"><input className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#12626b]" placeholder="Tên khách hàng" /><div className="grid grid-cols-2 gap-3"><input className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none" placeholder="Ngày nhận phòng" /><input className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none" placeholder="Ngày trả phòng" /></div><select className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none"><option>Chọn loại phòng</option><option>Standard King</option><option>Deluxe Garden</option><option>Family Suite</option></select></div><div className="mt-6 flex justify-end gap-2"><button onClick={() => setShowBooking(false)} className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-500">Hủy</button><button onClick={() => { setShowBooking(false); notify('Đã tạo đặt phòng thành công') }} className="rounded-lg bg-[#123f50] px-4 py-2 text-xs font-semibold text-white">Lưu đặt phòng</button></div></div></div>}
    </main>
  )
}
