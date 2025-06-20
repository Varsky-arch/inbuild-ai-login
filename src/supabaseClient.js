// 📁 src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ptguiwznbrebhmtmqqua.supabase.co"; // ganti sesuai milikmu
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0Z3Vpd3puYnJlYmhtdG1xcXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMTc4MDQsImV4cCI6MjA2NTg5MzgwNH0.zst-RX75xCUDGPBXujwpgFIhHAPyrZ4ig-678SSb4es"; // ganti sesuai milikmu

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
