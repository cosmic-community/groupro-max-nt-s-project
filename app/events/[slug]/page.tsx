// app/events/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEvent, getMetafieldValue } from '@/lib/cosmic'

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await getEvent(slug)

  if (!event) {
    notFound()
  }

  const title = getMetafieldValue(event.metadata?.event_title) || event.title
  const description = getMetafieldValue(event.metadata?.description)
  const location = getMetafieldValue(event.metadata?.location)
  const eventDate = getMetafieldValue(event.metadata?.event_date)
  const coverImage = event.metadata?.cover_image
  const group = event.metadata?.group

  const formatFullDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div>
      {coverImage && (
        <div className="relative h-[400px] md:h-[500px] bg-gray-900">
          <img
            src={`${coverImage.imgix_url}?w=2400&h=1000&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <Link href="/events" className="inline-flex items-center gap-1 text-white/80 hover:text-white mb-4 text-sm">
              ← Back to events
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!coverImage && (
          <>
            <Link href="/events" className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 mb-6 text-sm font-medium">
              ← Back to events
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h1>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {eventDate && (
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 text-brand-600 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-wide">Date</span>
              </div>
              <p className="text-gray-900 font-medium">{formatFullDate(eventDate)}</p>
            </div>
          )}
          {location && (
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 text-brand-600 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-wide">Location</span>
              </div>
              <p className="text-gray-900 font-medium">{location}</p>
            </div>
          )}
          {group && (
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 text-brand-600 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-wide">Group</span>
              </div>
              <Link href={`/groups/${group.slug}`} className="text-brand-600 hover:text-brand-700 font-medium">
                {getMetafieldValue(group.metadata?.name) || group.title}
              </Link>
            </div>
          )}
        </div>

        {description && (
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About this event</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{description}</p>
          </div>
        )}
      </div>
    </div>
  )
}