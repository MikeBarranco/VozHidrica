import { Heart, Share2, MessageCircle, ExternalLink } from 'lucide-react';
import { SocialPost } from '../hooks/useSocialData';

interface PostCardProps {
  post: SocialPost;
  onClick: () => void;
}

export default function PostCard({ post, onClick }: PostCardProps) {
  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `hace ${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''}`;
    }
    if (diffInHours < 24) {
      return `hace ${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`;
    }
    if (diffInDays < 7) {
      return `hace ${diffInDays} día${diffInDays !== 1 ? 's' : ''}`;
    }
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getPlatformColor = (platform: string): string => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'facebook':
        return 'bg-blue-600';
      case 'twitter':
        return 'bg-sky-500';
      case 'linkedin':
        return 'bg-blue-700';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${getPlatformColor(
                post.platform
              )}`}
            >
              {post.platform}
            </span>
            <span className="text-sm text-gray-500">
              {formatTimeAgo(post.published_at)}
            </span>
          </div>
          <a
            href={post.post_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#EB0029] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        <p className="text-gray-800 mb-4 line-clamp-3">{post.content}</p>
      </div>

      <div
        className="relative cursor-pointer overflow-hidden group"
        onClick={onClick}
      >
        <img
          src={post.image_url}
          alt="Post"
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-semibold">
            Ver más
          </span>
        </div>
      </div>

      <div className="p-4 flex items-center justify-around border-t border-gray-100">
        <div className="flex items-center gap-2 text-gray-600">
          <Heart className="w-5 h-5" />
          <span className="text-sm font-medium">
            {formatNumber(post.likes_count)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">
            {formatNumber(post.comments_count)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Share2 className="w-5 h-5" />
          <span className="text-sm font-medium">
            {formatNumber(post.shares_count)}
          </span>
        </div>
      </div>
    </div>
  );
}
