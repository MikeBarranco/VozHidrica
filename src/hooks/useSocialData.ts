import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface SocialPost {
  id: string;
  platform: string;
  content: string;
  image_url: string;
  post_url: string;
  published_at: string;
  likes_count: number;
  shares_count: number;
  comments_count: number;
}

export interface CarouselBanner {
  id: string;
  title: string;
  image_url: string;
  link_url: string | null;
  display_order: number;
}

export interface SocialLink {
  id: string;
  platform_name: string;
  profile_url: string;
  follower_count?: number;
  icon_name: string;
  display_order: number;
}

export interface NewsItem {
  id: string;
  title: string;
  image_url: string | null;
  news_url: string;
  color_card: string;
  display_order: number;
}

export function useSocialPosts() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('social_posts')
        .select('*')
        .order('published_at', { ascending: false });

      if (fetchError) throw fetchError;
      setPosts(data || []);
      setError(null);
    } catch (err) {
      setError('Error loading posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading, error, refetch: fetchPosts };
}

export function useCarouselBanners() {
  const [banners, setBanners] = useState<CarouselBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('carousel_banners')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (fetchError) throw fetchError;
      setBanners(data || []);
      setError(null);
    } catch (err) {
      setError('Error loading banners');
      console.error('Error fetching banners:', err);
    } finally {
      setLoading(false);
    }
  };

  return { banners, loading, error, refetch: fetchBanners };
}

export function useSocialLinks() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('social_links')
        .select('*')
        .order('display_order');

      if (fetchError) throw fetchError;
      setLinks(data || []);
      setError(null);
    } catch (err) {
      setError('Error loading social links');
      console.error('Error fetching social links:', err);
    } finally {
      setLoading(false);
    }
  };

  return { links, loading, error, refetch: fetchLinks };
}

export function useNewsItems() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNewsItems();
  }, []);

  const fetchNewsItems = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('news_items')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (fetchError) throw fetchError;
      setNewsItems(data || []);
      setError(null);
    } catch (err) {
      setError('Error loading news items');
      console.error('Error fetching news items:', err);
    } finally {
      setLoading(false);
    }
  };

  return { newsItems, loading, error, refetch: fetchNewsItems };
}
