import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { SocialPost } from '../hooks/useSocialData';
import PostCard from './PostCard';

interface PostsFeedProps {
  posts: SocialPost[];
  loading: boolean;
  onRefresh: () => void;
  onPostClick: (post: SocialPost) => void;
}

export default function PostsFeed({
  posts,
  loading,
  onRefresh,
  onPostClick,
}: PostsFeedProps) {
  const [filter, setFilter] = useState<string>('all');

  const filteredPosts =
    filter === 'all'
      ? posts
      : posts.filter(
          (post) => post.platform.toLowerCase() === filter.toLowerCase()
        );

  const platforms = ['all', ...new Set(posts.map((post) => post.platform))];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Publicaciones Recientes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="h-64 bg-gray-200"></div>
              <div className="p-4 flex justify-around">
                <div className="h-4 bg-gray-200 rounded w-12"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Publicaciones Recientes
        </h2>
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-[#EB0029] text-white rounded-lg hover:bg-[#c9022f] transition-colors duration-300"
        >
          <RefreshCw className="w-4 h-4" />
          Actualizar
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <button
            key={platform}
            onClick={() => setFilter(platform)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              filter === platform
                ? 'bg-[#EB0029] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {platform === 'all' ? 'Todas' : platform}
          </button>
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No hay publicaciones disponibles
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => onPostClick(post)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
