/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '4000', // Ajoutez le port si nécessaire
          pathname: '/assets/**', // Permet d'accepter toutes les images sous le dossier /assets/
        },
      ],
    },
  };
  
  export default nextConfig;