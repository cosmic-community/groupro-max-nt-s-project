import { createBucketClient } from '@cosmicjs/sdk'
import { Group, Member, Event, hasStatus } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export async function getGroups(): Promise<Group[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'groups' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Group[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch groups')
  }
}

export async function getGroup(slug: string): Promise<Group | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'groups', slug })
      .depth(1)
    return response.object as Group
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch group')
  }
}

export async function getMembers(): Promise<Member[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Member[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch members')
  }
}

export async function getMember(slug: string): Promise<Member | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'members', slug })
      .depth(1)
    return response.object as Member
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch member')
  }
}

export async function getMembersByGroup(groupId: string): Promise<Member[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'members', 'metadata.group': groupId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Member[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch members')
  }
}

export async function getEvents(): Promise<Event[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'events' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const events = response.objects as Event[]
    return events.sort((a, b) => {
      const dateA = new Date(a.metadata?.event_date || '').getTime()
      const dateB = new Date(b.metadata?.event_date || '').getTime()
      return dateA - dateB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch events')
  }
}

export async function getEvent(slug: string): Promise<Event | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'events', slug })
      .depth(1)
    return response.object as Event
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch event')
  }
}

export async function getEventsByGroup(groupId: string): Promise<Event[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'events', 'metadata.group': groupId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const events = response.objects as Event[]
    return events.sort((a, b) => {
      const dateA = new Date(a.metadata?.event_date || '').getTime()
      const dateB = new Date(b.metadata?.event_date || '').getTime()
      return dateA - dateB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch events')
  }
}