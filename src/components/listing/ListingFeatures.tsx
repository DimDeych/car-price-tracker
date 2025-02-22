
interface ListingFeaturesProps {
  description: string;
  features: string[];
}

export const ListingFeatures = ({ description, features }: ListingFeaturesProps) => {
  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-4">Описание</h2>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Комплектация</h2>
        <div className="grid grid-cols-2 gap-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
