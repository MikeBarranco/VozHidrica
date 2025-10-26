import { X, Heart, Share2, MessageCircle, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import { SocialPost } from '../hooks/useSocialData';

interface PostModalProps {
  post: SocialPost | null;
  onClose: () => void;
}

export default function PostModal({ post, onClose }: PostModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (post) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [post, onClose]);

  if (!post) return null;

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
      month: 'long',
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-4 left-full ml-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span
                className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${getPlatformColor(
                  post.platform
                )}`}
              >
                {post.platform}
              </span>
              <span className="text-gray-500">
                {formatTimeAgo(post.published_at)}
              </span>
            </div>
            <a
              href={post.post_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#EB0029] text-white rounded-lg hover:bg-[#c9022f] transition-colors"
            >
              <span className="text-sm font-semibold">Ver en {post.platform}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <img
            src={post.image_url}
            alt="Post"
            className="w-full rounded-lg mb-6"
          />

          <p className="text-gray-800 text-lg mb-6 whitespace-pre-wrap">
            {post.content}
          </p>

          <div className="flex items-center justify-around p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-gray-700">
              <Heart className="w-6 h-6 text-red-500" />
              <span className="text-lg font-semibold">
                {formatNumber(post.likes_count)}
              </span>
              <span className="text-sm text-gray-500">Me gusta</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MessageCircle className="w-6 h-6 text-blue-500" />
              <span className="text-lg font-semibold">
                {formatNumber(post.comments_count)}
              </span>
              <span className="text-sm text-gray-500">Comentarios</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Share2 className="w-6 h-6 text-green-500" />
              <span className="text-lg font-semibold">
                {formatNumber(post.shares_count)}
              </span>
              <span className="text-sm text-gray-500">Compartidos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
