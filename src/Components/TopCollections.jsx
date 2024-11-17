import TopCollectionCard from "./TopCollectionCard";

import photo1 from "../.././public/WholeSpices.png";
import photo2 from "../.././public/Tea.png";
import photo3 from "../.././public/Coffee.png";
import photo4 from "../.././public/powderedSpices.png";
import { Link } from "react-router-dom";

const TopCollections = () => {
    const cards = [photo1, photo2, photo3, photo4];
    const name = ["Whole Spices", "Tea", "Coffee", "Powdered Spices"];
    const linking = ["/Whole-Spices", "/Tea", "/Coffee", "/Powdered-Spices"];

    return (
        <div className="">
            <h2 className='font-bold text-[2.5rem] p-2 m-auto mt-4 mb-2 flex justify-center'>TOP COLLECTIONS</h2>

            <div className='flex gap-[55px] ml-[150px] flex-wrap'>
                {cards.map((photo, index) => (
                    <Link key={index} to={linking[index]}>
                        <TopCollectionCard photo={photo} name={name[index]} />
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default TopCollections;
