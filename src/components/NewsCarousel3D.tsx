import { NewsItem } from '../hooks/useSocialData';

interface NewsCarousel3DProps {
  newsItems: NewsItem[];
}

export default function NewsCarousel3D({ newsItems }: NewsCarousel3DProps) {
  if (newsItems.length === 0) {
    return null;
  }

  const quantity = newsItems.length;

  const placeholderImages = [
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400&h=600&fit=crop',
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Noticias Destacadas
      </h2>
      <div className="w-full h-[400px] relative flex items-center justify-center overflow-hidden">
        <div
          className="absolute w-[120px] h-[180px] top-[25%] left-[calc(50%-62.5px)] z-[2]"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'perspective(1000px)',
            animation: 'rotating3D 20s linear infinite',
          }}
        >
          {newsItems.map((item, index) => {
            const angleStep = 360 / quantity;
            const angle = angleStep * index;
            const translateZ = 120 + 180;

            return (
              <a
                key={item.id}
                href={item.news_url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 border-2 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                style={{
                  borderColor: `rgb(${item.color_card})`,
                  transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                }}
              >
                <img
                  src={item.image_url || placeholderImages[index % placeholderImages.length]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </a>
            );
          })}
        </div>
        <style>
          {`
            @keyframes rotating3D {
              from {
                transform: perspective(1000px) rotateX(-15deg) rotateY(0deg);
              }
              to {
                transform: perspective(1000px) rotateX(-15deg) rotateY(360deg);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}
