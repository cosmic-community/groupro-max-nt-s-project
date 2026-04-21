import Link from 'next/link'
import { Event } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function EventCard({ event }: { event: Event }) {
  const title = getMetafieldValue(event.metadata?.event_title) || event.title
  const description = getMetafieldValue(event.metadata?.description)
  const location = getMetafieldValue(event.metadata?.location)
  const eventDate = getMetafieldValue(event.metadata?.event_date)
  const coverImage = event.metadata?.cover_image

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <Link href={`/events/${event.slug}`} className="group block">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
        {coverImage && (
          <div className="aspect-[16/9] overflow-hidden bg-gray-100 relative">
            <img
              src={`${coverImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {eventDate && (
              <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-2 shadow-lg">
                <div className="text-xs font-semibold text-brand-600 uppercase">
                  {new Date(eventDate).toLocaleDateString('en-US', { month: 'short' })}
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {new Date(eventDate).getDate()}
                </div>
              </div>
            )}
          </div>
        )}
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors mb-2">
            {title}
          </h3>
          <div className="flex flex-col gap-1 text-sm text-gray-600 mb-2">
            {eventDate && (
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(eventDate)}
              </div>
            )}
            {location && (
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </div>
            )}
          </div>
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          )}
        </div>
      </article>
    </Link>
  )
}