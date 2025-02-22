
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageGalleryProps {
  images?: string[];
  aspectRatio?: number;
  className?: string;
}

export const ImageGallery = ({ 
  images = [], 
  aspectRatio = 16 / 9,
  className = ""
}: ImageGalleryProps) => {
  // Если изображений нет, показываем placeholder
  if (images.length === 0) {
    return (
      <AspectRatio ratio={aspectRatio} className={`bg-gray-100 ${className}`}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-400">Нет изображений</span>
        </div>
      </AspectRatio>
    );
  }

  return (
    <Carousel className={className}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <AspectRatio ratio={aspectRatio}>
              <img
                src={image}
                alt={`Изображение ${index + 1}`}
                className="object-cover w-full h-full rounded-lg"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </>
      )}
    </Carousel>
  );
};
