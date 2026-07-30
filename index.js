export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Ambil path + query param (contoh: /ivT2Vp5xH.mp4) lalu gabungkan ke cdn2.aceimg.com
    const targetUrl = new URL(url.pathname + url.search, "https://cdn2.aceimg.com");

    // Salin header request dan ganti Host header agar diterima server cdn2.aceimg.com
    const modifiedHeaders = new Headers(request.headers);
    modifiedHeaders.set("Host", "cdn2.aceimg.com");
    modifiedHeaders.set("Referer", "https://cdn2.aceimg.com/");

    try {
      const response = await fetch(targetUrl.toString(), {
        method: request.method,
        headers: modifiedHeaders,
        redirect: "follow",
      });

      return response;
    } catch (e) {
      return new Response("Error fetching media from cdn2.aceimg.com", { status: 500 });
    }
  },
};
