import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center text-white text-lg font-bold">
              G
            </div>
            <span className="text-xl font-bold text-gray-900">Groupro</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link href="/groups" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-md transition-colors">
              Groups
            </Link>
            <Link href="/members" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-md transition-colors">
              Members
            </Link>
            <Link href="/events" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-md transition-colors">
              Events
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}