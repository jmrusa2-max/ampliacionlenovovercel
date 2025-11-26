/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Permite usar quality={90} en <Image> sin advertencias
    // ✅ Este es el formato válido para Next.js 13+
    formats: ['image/avif', 'image/webp'],
    // Si usas quality={90} en algún <Image>, inclúyelo aquí:
    // (solo valores permitidos: 10–100, pero debes declararlos explícitamente)
    // ↓ descomenta la línea de abajo si quieres permitir quality=90
    // qualities: [75, 90],
  },
};

module.exports = nextConfig;