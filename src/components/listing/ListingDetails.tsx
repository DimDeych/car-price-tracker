
interface ListingDetailsProps {
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  engine: {
    power: string;
  };
  transmission: string;
}

export const ListingDetails = ({
  brand,
  model,
  year,
  price,
  mileage,
  engine,
  transmission
}: ListingDetailsProps) => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-2">
          {brand} {model} {year}
        </h1>
        <div className="text-2xl text-primary font-semibold">
          €{price.toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border">
          <div className="text-sm text-gray-500">Пробег</div>
          <div className="font-medium">{mileage.toLocaleString()} км</div>
        </div>
        <div className="bg-white p-4 rounded-xl border">
          <div className="text-sm text-gray-500">Двигатель</div>
          <div className="font-medium">{engine.power}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border">
          <div className="text-sm text-gray-500">Коробка</div>
          <div className="font-medium">{transmission}</div>
        </div>
      </div>
    </>
  );
};
