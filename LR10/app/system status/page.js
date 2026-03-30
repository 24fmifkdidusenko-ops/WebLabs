export default async function SystemStatusPage({ searchParams, headers }) {
 
   const serverTime = new Date().toISOString();
  const requestHeaders = headers;

  return (
    <div>
      <h1>System Status</h1>
      <p><strong>Server Time:</strong> {serverTime}</p>
      <h2>Request Headers</h2>
      <pre>{JSON.stringify(requestHeaders, null, 2)}</pre>
    </div>
  );
}


import { headers } from "next/headers";