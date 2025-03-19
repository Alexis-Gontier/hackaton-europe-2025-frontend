import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {

    const URL_SET = process.env.NEXT_PUBLIC_FRONTEND_URL;

    if (!URL_SET) {
        throw new Error('La variable NEXT_PUBLIC_FRONTEND_URL n\'est pas définie.');
    }

    return [
        {
            url: URL_SET,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${URL_SET}/actions`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: `${URL_SET}/search`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: `${URL_SET}/profile`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: `${URL_SET}/login`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${URL_SET}/register`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ]
}