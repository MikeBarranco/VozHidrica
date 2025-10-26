import { SocialLink } from '../hooks/useSocialData';

interface SocialLinksBarProps {
  links: SocialLink[];
}

const platformStyles: Record<string, string> = {
  Facebook: 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50',
  YouTube: 'bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50',
  X: 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-400/50',
  Instagram: 'bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 shadow-lg shadow-pink-500/50',
};

export default function SocialLinksBar({ links }: SocialLinksBarProps) {

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Síguenos en Redes Sociales
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {links.map((link) => {
          const styles = platformStyles[link.platform_name] || 'bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 shadow-lg shadow-gray-500/50';
          return (
            <a
              key={link.id}
              href={link.profile_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-white font-semibold rounded-lg text-base px-6 py-3 text-center transition-all duration-300 min-w-[140px] ${styles}`}
            >
              {link.platform_name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
