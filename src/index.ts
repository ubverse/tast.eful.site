import Mustache from 'mustache'

import words from './words'
import content from './content'

const ALLOWED_HOSTNAMES = words.map((w) => w.slice(0, -4) + '.eful.site')

export default {
  async fetch (request: Request): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname !== '/') {
      return new Response(null, { status: 404 })
    }

    if (request.method !== 'GET') {
      return new Response(null, { status: 404 })
    }

    if (!ALLOWED_HOSTNAMES.includes(url.hostname)) {
      return new Response(null, { status: 404 })
    }

    const [subdomain] = url.hostname.split('.')

    const title = `Welcome to ${url.hostname}!`
    const heading = `what a ${subdomain}eful site`.toUpperCase()
    const html = Mustache.render(content, { title, heading })

    const headers = {
      'content-type': 'text/html;charset=UTF-8'
    }

    return new Response(html, { headers })
  }
}
