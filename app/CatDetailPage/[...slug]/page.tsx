'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function CatDetailPage ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  useEffect(() => {}, []);

  return <div>Hello ID: {params.slug}</div>;
}
