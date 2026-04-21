import Link from 'next/link'
import { Member } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function MemberCard({ member }: { member: Member }) {
  const fullName = getMetafieldValue(member.metadata?.full_name) || member.title
  const bio = getMetafieldValue(member.metadata?.bio)
  const role = getMetafieldValue(member.metadata?.role)
  const avatar = member.metadata?.avatar

  return (
    <Link href={`/members/${member.slug}`} className="group block">
      <article className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 text-center h-full">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-brand-100 to-brand-200 ring-4 ring-white shadow-md">
          {avatar ? (
            <img
              src={`${avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={fullName}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-brand-600 text-2xl font-bold">
              {fullName.charAt(0)}
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors mb-1">
          {fullName}
        </h3>
        {role && (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 mb-2">
            {role}
          </span>
        )}
        {bio && (
          <p className="text-sm text-gray-600 line-clamp-2 mt-2">{bio}</p>
        )}
      </article>
    </Link>
  )
}