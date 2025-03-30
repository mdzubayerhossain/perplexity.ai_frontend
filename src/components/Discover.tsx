import React, { useEffect, useState } from 'react';
import { ExternalLink, Clock } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

function Discover() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/rss`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setNews(data.map((item: NewsItem) => ({
          ...item,
          pubDate: new Date(item.pubDate).toLocaleDateString(),
        })));
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#00A3FF]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Latest News</h2>
      <div className="grid gap-4">
        {news.map((item, index) => (
          <div key={index} className="bg-[#2D2E32] p-4 rounded-lg hover:bg-[#3D3E42] transition-colors">
            <h3 className="font-semibold mb-2 flex items-start justify-between">
              <span>{item.title}</span>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#00A3FF] ml-2 flex-shrink-0"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </h3>
            <p className="text-gray-400 text-sm mb-3">{item.description}</p>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {item.pubDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Discover;