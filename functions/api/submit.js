export const config = {
  runtime: "experimental"
};

export async function onRequest({ request, env }) {
  // 全局跨域头，所有请求、所有浏览器、微信内置浏览器全兼容
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Max-Age": "86400"
  };

  // 单独处理OPTIONS预检
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 只处理POST提交
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
    }

    const { college, name } = await request.json();

    // 数据库写入
    await env.DB.prepare(`
      INSERT INTO reservations (college, name) VALUES (?, ?)
    `).bind(college, name).run();

    return new Response(JSON.stringify({ success: true, msg: "预约成功" }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });

  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  }
}