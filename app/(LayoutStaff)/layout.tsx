import '../globals.css';
import cx from 'classnames';
import { inter, sfPro } from '../fonts';

export const metadata = {};

export default async function StaffLayout ({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={cx(sfPro.variable, inter.variable)}>{children}</body>
    </html>
  );
}
