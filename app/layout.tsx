
import Nav from '@components/Nav';
import '@styles/globals.css';
import Provider from '@components/Provider';

export const metadata = {
  title: 'Insulin controller',
  description: 'Discover & and share AI Prompts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient bg-gradient-radial' />
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}