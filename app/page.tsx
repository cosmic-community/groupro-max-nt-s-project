import Link from 'next/link'
import { getGroups, getEvents, getMembers } from '@/lib/cosmic'
import GroupCard from '@/components/GroupCard'
import EventCard from '@/components/EventCard'
import MemberCard from '@/components/MemberCard'

export default async function HomePage() {
  const [groups, events, members] = await Promise.all([
    getGroups(),
    getEvents(),
    getMembers(),
  ])

  const featuredGroups = groups.slice(0, 3)
  const upcomingEvents = events.slice(0, 3)
  const featuredMembers = members.slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-600 via-brand-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Connect, Create, Collaborate
            </h1>
            <p className="text-lg md:text-xl text-brand-100 mb-8 leading-relaxed">
              Discover communities that match your passions. Join groups, meet members, and attend events that bring people together.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/groups" className="bg-white text-brand-700 px-6 py-3 rounded-lg font-semibold hover:bg-brand-50 transition-colors">
                Explore Groups
              </Link>
              <Link href="/events" className="bg-brand-800/50 backdrop-blur text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-brand-800 transition-colors">
                View Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Groups */}
      {featuredGroups.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Groups</h2>
              <p className="text-gray-600">Join communities that share your interests</p>
            </div>
            <Link href="/groups" className="hidden sm:inline text-brand-600 hover:text-brand-700 font-medium">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
                <p className="text-gray-600">Don't miss out on these community gatherings</p>
              </div>
              <Link href="/events" className="hidden sm:inline text-brand-600 hover:text-brand-700 font-medium">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Members */}
      {featuredMembers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Members</h2>
              <p className="text-gray-600">Meet the people who make our communities vibrant</p>
            </div>
            <Link href="/members" className="hidden sm:inline text-brand-600 hover:text-brand-700 font-medium">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}