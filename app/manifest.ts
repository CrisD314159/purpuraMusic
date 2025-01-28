import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Púrpura Music Admin',
    short_name: 'Púrpura Music',
    description: 'Púrpura Music PWA Application',
    start_url: '/',
    display: 'standalone', // Usa 'standalone' para evitar que se muestre la barra de navegador
    background_color: 'transparent', // Asegura que el fondo sea transparente
    theme_color: '#010101', // Transparente para la barra de estado
    orientation: 'portrait',
    lang: 'en',
    icons: [
      {
        src: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ]
  };
}