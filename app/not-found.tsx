// app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '10px' }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Artículo inexistente.</p>
      <Link 
        href="/" 
        style={{
          backgroundColor: '#0070f3',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}
      >
        Volver a la pantalla inicial
      </Link>
    </div>
  );
}