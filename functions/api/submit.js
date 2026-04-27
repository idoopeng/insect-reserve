export async function onRequestPost({ request, env }) {
  // 处理跨域预检
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }

  try {
    // 接收前端数据
    const { college, name } = await request.json();

    // 写入数据库
    await env.DB.prepare(`
      INSERT INTO reservations (college, name) VALUES (?, ?)
    `).bind(college, name).run();

    // 返回成功
    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    // 返回错误
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}