export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              G
            </div>
            <span className="text-lg font-bold text-white">Groupro</span>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Groupro. Built with Cosmic.</p>
        </div>
      </div>
    </footer>
  )
}