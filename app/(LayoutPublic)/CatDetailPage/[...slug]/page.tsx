'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import CatDetailPage from '../page';

export default function CatDetailPageSlug ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  useEffect(() => {}, []);

  return <CatDetailPage params={{ slug: params.slug }} searchParams={{}} />;
}
