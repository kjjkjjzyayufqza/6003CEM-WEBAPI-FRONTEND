import React from 'react';
import AppointmentPage from '../page';

export default function Page ({ params }: { params: any }) {
  return <AppointmentPage params={params.slug} />;
}
