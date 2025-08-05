import CategoryBar from "../components/CategoryBar";
import Card from "../components/Card";
import { useState } from "react";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="bg-gray-100 w-full min-h-screen font-sans">
      <CategoryBar onCategoryClick={setSelectedCategory} />
      <Card scrollToCategory={selectedCategory} />
    </div>
  );
};

export default Menu;
