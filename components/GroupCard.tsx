import Link from 'next/link'
import { Group } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function GroupCard({ group }: { group: Group }) {
  const name = getMetafieldValue(group.metadata?.name) || group.title
  const description = getMetafieldValue(group.metadata?.description)
  const category = getMetafieldValue(group.metadata?.category)
  const coverImage = group.metadata?.cover_image

  return (
    <Link href={`/groups/${group.slug}`} className="group block">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
        {coverImage && (
          <div className="aspect-[16/10] overflow-hidden bg-gray-100">
            <img
              src={`${coverImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={name}
              width={400}
              height={250}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-5 flex-grow flex flex-col">
          {category && (
            <span className="inline-block w-fit px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 mb-3">
              {category}
            </span>
          )}
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors mb-2">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
          )}
        </div>
      </article>
    </Link>
  )
}