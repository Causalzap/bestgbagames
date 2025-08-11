// src/lib/utils.ts
import { type Metadata } from 'next/types';

export function constructMetadata({
  title = "Game Boy Advance Archive",
  description = "Ultimate resource for Game Boy Advance enthusiasts",
  noIndex = false
}: {
  title?: string;
  description?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    }),
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  }
}
