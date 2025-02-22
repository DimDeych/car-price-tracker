
interface ListingSidebarProps {
  seller: {
    name: string;
    phone: string;
    rating: number;
    location: string;
  };
}

export const ListingSidebar = ({ seller }: ListingSidebarProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white p-6 rounded-2xl border sticky top-24">
        <div className="text-xl font-semibold mb-4">{seller.name}</div>
        <div className="flex items-center mb-4">
          <div className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
            Рейтинг: {seller.rating}/5
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-gray-600">
            <div className="text-sm mb-1">Телефон</div>
            <div className="font-medium">{seller.phone}</div>
          </div>
          <div className="text-gray-600">
            <div className="text-sm mb-1">Местоположение</div>
            <div className="font-medium">{seller.location}</div>
          </div>
          <button className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
            Связаться с продавцом
          </button>
        </div>
      </div>
    </div>
  );
};
