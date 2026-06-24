import React, { useState, useEffect } from "react";
import { NewsStory } from "../types";
import { fetchTopHeadlines } from "../services/newsApi";
import { newsStories } from "../data/news";

export default function NewsWidget() {
  const [stories, setStories] = useState<NewsStory[]>([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const liveStories = await fetchTopHeadlines();
        if (liveStories && liveStories.length > 0) {
          setStories(liveStories);
          return;
        }
      } catch (e) {
        console.error("Failed to load live news, using local fallback", e);
      }
      setStories(newsStories);
    };
    loadNews();
  }, []);

  useEffect(() => {
    if (stories.length === 0) return;
    const timer = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % stories.length);
    }, 2000); // Advances highlighted article every 2 seconds
    return () => clearInterval(timer);
  }, [stories]);

  const activeNews = stories[currentNewsIndex] || newsStories[0];

  return (
    <div
      id="widget_news_feed"
      className="flex flex-col bg-[#111111] border border-[#1e1e1e] rounded-3xl overflow-hidden shadow-xl h-full min-h-[440px]"
    >
      {/* Top half: Large Photo with gradient title overlay */}
      <div id="news_banner_box" className="relative h-[220px] md:h-[280px] shrink-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
        <img
          src={activeNews.image}
          alt={activeNews.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute bottom-0 inset-x-0 p-5 z-20">
          <h4 id="news_headline" className="text-base md:text-lg font-black leading-tight text-white mb-1.5 drop-shadow-md">
            {activeNews.title}
          </h4>
          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">
            <span>{activeNews.source}</span>
            <span>•</span>
            <span>{activeNews.publishedAt}</span>
          </div>
        </div>
      </div>

      {/* Bottom half: Description with scroll */}
      <div id="news_content_box" className="p-6 overflow-y-auto flex-1">
        <p id="news_body_text" className="text-xs md:text-sm text-gray-400 leading-relaxed font-semibold">
          {activeNews.description}
        </p>
      </div>
    </div>
  );
}
