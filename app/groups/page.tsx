import { getGroups } from '@/lib/cosmic'
import GroupCard from '@/components/GroupCard'

export default async function GroupsPage() {
  const groups = await getGroups()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">All Groups</h1>
        <p className="text-lg text-gray-600">Browse all {groups.length} communities and find your people</p>
      </div>
      {groups.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No groups available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}
    </div>
  )
}