export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export type GroupCategory = 'Hobby' | 'Professional' | 'Social' | 'Educational' | 'Sports' | 'Arts';
export type MemberRole = 'Admin' | 'Moderator' | 'Member' | 'Founder';

export interface Group extends CosmicObject {
  type: 'groups';
  metadata: {
    name?: string;
    description?: string;
    cover_image?: {
      url: string;
      imgix_url: string;
    };
    category?: string;
  };
}

export interface Member extends CosmicObject {
  type: 'members';
  metadata: {
    full_name?: string;
    bio?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
    role?: string;
    group?: Group;
  };
}

export interface Event extends CosmicObject {
  type: 'events';
  metadata: {
    event_title?: string;
    description?: string;
    event_date?: string;
    location?: string;
    cover_image?: {
      url: string;
      imgix_url: string;
    };
    group?: Group;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}