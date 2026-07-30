export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = `https://aceimg.com/upload/?f=${fileCode}`;
    
    return Response.redirect(targetUrl, 302);
  }
};
