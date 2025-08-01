import HomeCard from "@/components/modules/HomeCard";
import React, { useEffect, useState } from "react";
import db from "@/data/db.json";

export default function Homes() {
  const [showHomes, setShowHomes] = useState([...db.homes]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortHomes, setSortHomes] = useState("-1");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const newHomes = db.homes.filter((home) => {
      return home.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setShowHomes(newHomes);
  }, [searchQuery]);

  useEffect(() => {
    switch (sortHomes) {
      case "price": {
        const sortedHomes = [...showHomes].sort((a, b) => a.price - b.price);
        console.log(sortHomes);

        setShowHomes(sortedHomes);
        break;
      }
      case "rooms": {
        const sortedHomes = [...showHomes].sort(
          (a, b) => a.roomCount - b.roomCount
        );
        setShowHomes(sortedHomes);
        break;
      }
      case "metrage": {
        const sortedHomes = [...showHomes].sort(
          (a, b) => a.meterage - b.meterage
        );
        setShowHomes(sortedHomes);
        break;
      }
      default: {
        setShowHomes([...db.homes]);
        break;
      }
    }
  }, [sortHomes]);
  
  const paginateHandler=(page)=>{
    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;
    setShowHomes(db.homes.slice(startIndex, endIndex));
    setCurrentPage(page);

  }
  return (
    <>
      <div className="home-section" id="houses">
        <div className="home-filter-search">
          <div className="home-filter">
            <select
              defaultValue={sortHomes}
              onChange={(e) => setSortHomes(e.target.value)}
            >
              <option value="-1">انتخاب کنید</option>
              <option value="price">بر اساس قیمت</option>
              <option value="rooms">بر اساس تعداد اتاق</option>
              <option value="metrage">بر اساس اندازه</option>
            </select>
          </div>
          <div className="home-search">
            <input
              type="text"
              placeholder="جستجو کنید"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="homes">
          {showHomes.length ? (
            showHomes.slice(0,6).map((home) => <HomeCard key={home.id} {...home} />)
          ) : (
            <>
              <h2 className="no-home">خانه ای با این مشخصات پیدا نشد</h2>
            </>
          )}
        </div>
        <ul class="pagination__list">
          {Array.from({length:Math.ceil(db.homes.length/6)}, (_, index) => (
            <li className="pagination__item" key={index} onClick={()=>paginateHandler(index+1)} style={currentPage === index + 1 ? {backgroundColor: "#2727274f"} : {}}>
              <span className="pagination__link">
                {index + 1}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
