// app/groups/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getGroup, getMembersByGroup, getEventsByGroup, getMetafieldValue } from '@/lib/cosmic'
import MemberCard from '@/components/MemberCard'
import EventCard from '@/components/EventCard'

export default async function GroupDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const group = await getGroup(slug)

  if (!group) {
    notFound()
  }

  const [members, events] = await Promise.all([
    getMembersByGroup(group.id),
    getEventsByGroup(group.id),
  ])

  const name = getMetafieldValue(group.metadata?.name) || group.title
  const description = getMetafieldValue(group.metadata?.description)
  const category = getMetafieldValue(group.metadata?.category)
  const coverImage = group.metadata?.cover_image

  return (
    <div>
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-brand-600 to-purple-700 text-white">
        {coverImage && (
          <div className="absolute inset-0 opacity-30">
            <img
              src={`${coverImage.imgix_url}?w=2400&h=800&fit=crop&auto=format,compress`}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Link href="/groups" className="inline-flex items-center gap-1 text-brand-100 hover:text-white mb-4 text-sm">
            ← Back to groups
          </Link>
          {category && (
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur text-white mb-4">
              {category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{name}</h1>
          {description && (
            <p className="text-lg text-brand-100 max-w-3xl">{description}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Members */}
        {members.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Members ({members.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        )}

        {/* Events */}
        {events.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Events ({events.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {members.length === 0 && events.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No members or events yet for this group.</p>
          </div>
        )}
      </div>
    </div>
  )
}