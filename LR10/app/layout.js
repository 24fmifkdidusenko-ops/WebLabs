
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Lab 10 SSR</title>
      </head>
      <body>
        <header>
          <nav>
            <a href="/">Home</a> |{" "}
            <a href="/system-status">System Status</a> |{" "}
            <a href="/search?q=shirt">Search Example</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}