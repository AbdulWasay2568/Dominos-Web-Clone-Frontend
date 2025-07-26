import Navbar from "../components/NavBar";
import Card from "../components/Card";

interface Deal {
  id: number;
  name: string;
  discount: string;
  price: number;
  image: string;
}

const deals: Deal[] = [
  {
    id: 1,
    name: "Wacky Medium",
    discount: "Rs. 200 OFF on Medium Classic Pizza",
    price: 1050,
    image: "https://i.imgur.com/U6B4YxL.png",
  },
  {
    id: 2,
    name: "Wacky Large",
    discount: "Rs. 300 OFF on Large Classic Pizza",
    price: 1350,
    image: "https://i.imgur.com/Mv1lOUn.png",
  },
];

const Menu = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
        <Navbar/>
        <Card/>
    </div>
  );
};

export default Menu;
