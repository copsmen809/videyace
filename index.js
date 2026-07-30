export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Abaikan request favicon
    if (url.pathname === "/favicon.ico") {
      return new Response(null, { status: 204 });
    }

    // Ambil kode/nama file dari path URL (misal: /GttN0cRbx.mp4 -> GttN0cRbx.mp4)
    const fileCode = url.pathname.substring(1);

    // Jika tidak ada kode URL yang dimasukkan
    if (!fileCode) {
      return new Response("Media not found", { status: 400 });
    }

    // Target URL sesuai format yang kamu minta
    const targetUrl = `https://aceimg.com/upload/?f=${fileCode}`;

    try {
      // Ambil (fetch) video langsung dari aceimg
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
          "Referer": "https://aceimg.com/",
        },
      });

      // Meneruskan response stream video agar bisa diputar langsung di browser
      const responseHeaders = new Headers(response.headers);
      responseHeaders.set("Access-Control-Allow-Origin", "*");

      return new Response(response.body, {
        status: response.status,
        headers: responseHeaders,
      });
    } catch (e) {
      // Fallback redirect jika proxy gagal
      return Response.redirect(targetUrl, 302);
    }
  },
};
