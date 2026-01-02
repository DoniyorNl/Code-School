import { GetServerSideProps } from 'next'
import { siteConfig } from '../config/site.config'

// This is a dynamic sitemap generator
// It will be generated on each request

function generateSiteMap() {
	const baseUrl = siteConfig.baseURL.replace(/\/$/, '') // Remove trailing slash

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Courses Page -->
  <url>
    <loc>${baseUrl}/courses</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Services Page -->
  <url>
    <loc>${baseUrl}/services</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Books Page -->
  <url>
    <loc>${baseUrl}/books</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Products Page -->
  <url>
    <loc>${baseUrl}/products</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Add more static pages here -->
  
  <!--
  TODO: For dynamic pages (individual courses, products, etc.),
  fetch data from your database and add them here.
  
  Example code to add after fetching courses from database:
  
  courses.map((course) => 
    '<url>' +
    '<loc>' + baseUrl + '/courses/' + course.slug + '</loc>' +
    '<lastmod>' + course.updatedAt + '</lastmod>' +
    '<changefreq>monthly</changefreq>' +
    '<priority>0.7</priority>' +
    '</url>'
  ).join('')
  -->

</urlset>
  `
}

function SiteMap() {
	// getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	// Generate the XML sitemap
	const sitemap = generateSiteMap()

	res.setHeader('Content-Type', 'text/xml')
	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
	res.write(sitemap)
	res.end()

	return {
		props: {},
	}
}

export default SiteMap
