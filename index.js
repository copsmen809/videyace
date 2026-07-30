export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = `https://cdn2.aceimg.com${url.pathname}${url.search}`;
    
    return Response.redirect(targetUrl, 302);
  }
};
