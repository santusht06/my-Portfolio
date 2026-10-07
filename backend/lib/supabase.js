const { createClient } = require("@supabase/supabase-js");
const ws = require("ws");
const { config } = require("dotenv");
config();

const supabaseUrl =
  process.env.SUPABASE_URL || "https://bcehjzwewfwoalrcuvba.supabase.co";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "sb_publishable_dBbibk3qK-DEgDNhMbLxQw_x3satGKo";

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  realtime: {
    transport: ws,
  },
});

module.exports = { supabase, supabaseUrl };
