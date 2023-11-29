import PetCard from "../PetCard/PetCard";
import { useEffect, useState } from 'react';

const PetTab = ({items, searchTerm, selectedCategory, page}) => {
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    // When the page changes, update the visible items
    setVisibleItems(items.slice(0, page * 6)); // Adjust the number based on your design
  }, [items, page]);

  const sortedItems = visibleItems.sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredItems = sortedItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredByCategory = selectedCategory === 'all'
    ? filteredItems
    : filteredItems.filter((item) => item.type === selectedCategory);

  // Show only pets that are not adopted (adopted: false)
  const notAdoptedItems = filteredByCategory.filter((item) => !item.adopted);

  return (
    <div className="grid justify-center md:grid-cols-2 md:ml-8 lg:grid-cols-3 gap-4 mb-3">
      {notAdoptedItems.map((item) => (
        <PetCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default PetTab;