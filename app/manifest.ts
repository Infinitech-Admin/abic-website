import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Abic Realty & Consultancy Corporation",
        short_name: "AbicRealty",
        description: 'Discover condos, offices, and properties for sale, lease, or rent with Abic Realty. Your trusted partner in real estate solutions.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
            {
                "src": "/assets/favicon/web-app-manifest-192x192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "maskable"
            },
            {
                "src": "/assets/favicon/web-app-manifest-512x512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable"
            },
        ],
    }
}