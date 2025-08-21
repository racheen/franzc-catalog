import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata = {
  title: 'My Firebase Tailwind App',
  description: 'Next.js + Tailwind + Firebase starter',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" enableSystem={true}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
