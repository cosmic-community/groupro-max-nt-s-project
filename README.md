# Groupro

![App Preview](https://imgix.cosmicjs.com/bf9b8930-3d9c-11f1-a386-4d54a5265133-autopilot-photo-1452860606245-08befc0ff44b-1776787886396.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern community platform built with Next.js 16 and Cosmic CMS for managing groups, members, and events.

## Features

- 👥 Browse community groups by category
- 🧑 View member profiles with roles
- 📅 Discover upcoming events
- 📱 Fully responsive design
- ⚡ Server-side rendering for performance
- 🎨 Modern UI with Tailwind CSS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69e7a16490067b42f59fd6b9&clone_repository=69e7a25090067b42f59fd72b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: Groupro"

### Code Generation Prompt

> Build a Next.js application for a website called "Groupro Max Nt's Project". The content is managed in Cosmic CMS with the following object types: groups, members, events. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

The app has been tailored to work with your existing Cosmic content structure.

## Technologies Used

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Cosmic CMS SDK

## Getting Started

### Prerequisites
- Bun or Node.js 18+
- Cosmic account with bucket

### Installation

```bash
bun install
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all groups
const { objects: groups } = await cosmic.objects
  .find({ type: 'groups' })
  .depth(1)
```

## Cosmic CMS Integration

The app connects to three object types: groups, members, and events with full object relationships.

## Deployment Options

Deploy to Vercel or Netlify with environment variables set.
<!-- README_END -->