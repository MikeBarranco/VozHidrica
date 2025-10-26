import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
  label?: string;
}

export default function BackButton({ to = '/home', label = 'Volver' }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="flex items-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors font-gotham font-medium text-14"
      aria-label={`${label} al inicio`}
    >
      <ArrowLeft className="w-6 h-6 text-gray-700" />
      <span className="text-gray-700">{label}</span>
    </button>
  );
}
