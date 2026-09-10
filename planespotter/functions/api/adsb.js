export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const radius = searchParams.get("radius");
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

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
