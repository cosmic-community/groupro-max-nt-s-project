import { getMembers } from '@/lib/cosmic'
import MemberCard from '@/components/MemberCard'

export default async function MembersPage() {
  const members = await getMembers()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">All Members</h1>
        <p className="text-lg text-gray-600">Meet our {members.length} amazing community members</p>
      </div>
      {members.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No members yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  )
}