// api/search.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  console.log("Incoming request:", req.method, req.url);
  console.log("ENV URL:", process.env.VITE_SUPABASE_URL?.slice(0,20) + "…");
  console.log("ENV KEY:", process.env.VITE_SUPABASE_ANON_KEY?.slice(0,10) + "…");

  if (req.method !== "POST") {
    console.log("Rejected non-POST");
    return res.status(405).json({ error: "Only POST allowed" });
  }

  let query;
  try {
    ({ query } = req.body);
    console.log("Parsed body:", req.body);
  } catch (e) {
    console.error("Body parse error:", e);
    return res.status(400).json({ error: "Invalid JSON" });
  }

  if (!query) {
    console.log("Missing query");
    return res.status(400).json({ error: "Missing `query` in JSON body" });
  }

  try {
    console.log("Calling search_documents RPC with:", query);
    const { data, error } = await supabase.rpc("search_documents", { q: query.trim() });
    if (error) throw error;
    console.log("RPC returned:", data?.length, "rows");
    return res.status(200).json({ results: data });
  } catch (err) {
    console.error("RPC error:", err);
    return res.status(500).json({ error: err.message });
  }
}
