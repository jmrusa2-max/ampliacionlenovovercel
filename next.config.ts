/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
  },
  // 👇 Añade esta línea para ver errores en tiempo de ejecución
  logging: {
    level: 'verbose',
  },
};

module.exports = nextConfig;