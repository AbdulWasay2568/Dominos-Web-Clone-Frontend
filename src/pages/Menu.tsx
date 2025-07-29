import Navbar from "../components/NavBar";
import Card from "../components/Card";
import { useState } from "react";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Navbar onCategoryClick={setSelectedCategory} />
      <Card scrollToCategory={selectedCategory} />
    </div>
  );
};

export default Menu;
