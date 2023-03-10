import Mustache from 'mustache'

import words from './words'
import content from './content'

const ALLOWED_HOSTNAMES = words.map((w) => w.slice(0, -4) + '.eful.site')

export default {
  async fetch (request: Request): Promise<Response> {
    const url = new URL(request.url)

    const requirements = url.pathname === '/' && request.method === 'GET' && ALLOWED_HOSTNAMES.includes(url.hostname)

    if (!requirements) {
      return new Response(null, { status: 404 })
    }

    const [subdomain] = url.hostname.split('.')

    const title = `welcome to my ${url.hostname}!`.toUpperCase()
    const heading = `thank you for visiting this ${subdomain}eful site`.toUpperCase()
    const html = Mustache.render(content, { title, heading })

    const headers = {
      'content-type': 'text/html;charset=UTF-8'
    }

    return new Response(html, { headers })
  }
}
