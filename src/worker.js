export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

    if (url.pathname === "/api/adsb") {
      const lat = url.searchParams.get("lat");
      const lon = url.searchParams.get("lon");
      const radius = url.searchParams.get("radius");
      if (!lat || !lon || !radius) {
        return new Response(JSON.stringify({ error: "parâmetros lat/lon/radius em falta" }), { status: 400, headers });
      }
      try {
        const target = `https://api.adsb.lol/v2/point/${lat}/${lon}/${radius}`;
        const r = await fetch(target);
        const text = await r.text();
        return new Response(text, { status: r.status, headers });
      } catch (err) {
        return new Response(JSON.stringify({ error: String(err) }), { status: 502, headers });
      }
    }

    if (url.pathname === "/api/route") {
      const callsign = url.searchParams.get("callsign");
      if (!callsign) {
        return new Response(JSON.stringify({ error: "parâmetro callsign em falta" }), { status: 400, headers });
      }
      try {
        const target = `https://api.adsbdb.com/v0/callsign/${encodeURIComponent(callsign)}`;
        const r = await fetch(target);
        const text = await r.text();
        return new Response(text, { status: r.status, headers });
      } catch (err) {
        return new Response(JSON.stringify({ error: String(err) }), { status: 502, headers });
      }
    }

    return env.ASSETS.fetch(request);
  }
};
