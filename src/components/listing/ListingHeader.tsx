
import { Heart, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/ImageGallery";

interface ListingHeaderProps {
  images: string[];
  isFavorite: boolean;
  isInComparison: boolean;
  onFavoriteToggle: () => void;
  onComparisonToggle: () => void;
}

export const ListingHeader = ({
  images,
  isFavorite,
  isInComparison,
  onFavoriteToggle,
  onComparisonToggle
}: ListingHeaderProps) => {
  return (
    <div className="relative mb-8">
      <ImageGallery 
        images={images}
        aspectRatio={16/9}
        className="rounded-2xl overflow-hidden"
      />
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/90 backdrop-blur-sm hover:bg-white/95"
          onClick={onFavoriteToggle}
        >
          <Heart className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/90 backdrop-blur-sm hover:bg-white/95"
          onClick={onComparisonToggle}
        >
          <Scale className={isInComparison ? "text-primary" : "text-gray-600"} />
        </Button>
      </div>
    </div>
  );
};
