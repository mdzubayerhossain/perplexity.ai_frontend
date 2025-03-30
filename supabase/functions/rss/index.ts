import { parseStringPromise } from "npm:xml2js@0.6.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const response = await fetch("http://feeds.bbci.co.uk/news/world/rss.xml", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RSSFetcher/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch RSS feed");
    }

    const xmlData = await response.text();

    if (xmlData.trim().toLowerCase().startsWith("<!doctype html>")) {
      throw new Error("Received HTML instead of RSS feed");
    }

    // Use parseStringPromise instead of parseString with a callback
    const result = await parseStringPromise(xmlData);

    try {
      const items = result.rss.channel[0].item.map((item: any) => ({
        title: item.title[0],
        link: item.link[0],
        pubDate: item.pubDate[0],
        description: item.description[0].replace(/<[^>]*>/g, "").substring(0, 150) + "..."
      }));

      return new Response(JSON.stringify(items), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      throw new Error("Invalid RSS feed format");
    }

  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Failed to fetch RSS feed" }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});
