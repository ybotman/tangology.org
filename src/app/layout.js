import './globals.css';

export const metadata = {
  title: 'Tangology - The Study of Argentine Tango',
  description:
    'History, music, people, and culture of Argentine tango. A community-driven knowledge base.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
