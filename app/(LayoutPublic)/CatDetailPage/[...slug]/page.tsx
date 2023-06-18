'use client';
import CatDetailPage from '../page';

export default function CatDetailPageSlug ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <CatDetailPage params={{ slug: params.slug }} searchParams={{}} />;
}
