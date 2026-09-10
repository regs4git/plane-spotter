export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const callsign = searchParams.get("callsign");
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

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
