// app/members/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMember, getMetafieldValue } from '@/lib/cosmic'

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const member = await getMember(slug)

  if (!member) {
    notFound()
  }

  const fullName = getMetafieldValue(member.metadata?.full_name) || member.title
  const bio = getMetafieldValue(member.metadata?.bio)
  const role = getMetafieldValue(member.metadata?.role)
  const avatar = member.metadata?.avatar
  const group = member.metadata?.group

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/members" className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 mb-6 text-sm font-medium">
        ← Back to members
      </Link>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-br from-brand-500 to-purple-600 h-32"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-brand-100 to-brand-200 ring-4 ring-white shadow-lg">
              {avatar ? (
                <img
                  src={`${avatar.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                  alt={fullName}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-brand-600 text-4xl font-bold">
                  {fullName.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-grow text-center sm:text-left sm:pb-4">
              <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
              {role && (
                <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-sm font-medium bg-purple-50 text-purple-700">
                  {role}
                </span>
              )}
            </div>
          </div>

          {bio && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">About</h2>
              <p className="text-gray-700 leading-relaxed">{bio}</p>
            </div>
          )}

          {group && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Group</h2>
              <Link
                href={`/groups/${group.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-lg hover:bg-brand-100 transition-colors font-medium"
              >
                {getMetafieldValue(group.metadata?.name) || group.title}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}