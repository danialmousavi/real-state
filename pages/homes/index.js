import HomeCard from "@/components/modules/HomeCard";
import React, { useEffect, useState } from "react";
import db from '@/data/db.json'

export default function Homes() {
  const [showHomes, setShowHomes] = useState([...db.homes]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortHomes,setSortHomes]=useState('-1')
  useEffect(()=>{
    const newHomes=db.homes.filter(home=>{
      return home.title.toLowerCase().includes(searchQuery.toLowerCase());
    })
    setShowHomes(newHomes)
  },[searchQuery])

    useEffect(()=>{
      switch(sortHomes){
        case "price":{
          const sortedHomes=[...showHomes].sort((a,b)=>a.price-b.price);
          console.log(sortHomes);
          
          setShowHomes(sortedHomes);
          break;
        }
        case "rooms":{
          const sortedHomes=[...showHomes].sort((a,b)=>a.roomCount-b.roomCount);
          setShowHomes(sortedHomes);
          break;
        }        
        case "metrage":{
          const sortedHomes=[...showHomes].sort((a,b)=>a.meterage-b.meterage);
          setShowHomes(sortedHomes);
          break;
        }
        default:{
          setShowHomes([...db.homes]);
          break;
        }
      }
  },[sortHomes])
  return (
    <>
      <div className="home-section" id="houses">
        <div className="home-filter-search">
          <div className="home-filter">
            <select defaultValue={sortHomes} onChange={(e)=>setSortHomes(e.target.value)}>
              <option value="-1" >
                انتخاب کنید
              </option>
              <option value="price">بر اساس قیمت</option>
              <option value="rooms">بر اساس تعداد اتاق</option>
              <option value="metrage">بر اساس اندازه</option>
            </select>
          </div>
          <div className="home-search">
            <input type="text" placeholder="جستجو کنید" onChange={(e)=>setSearchQuery(e.target.value)} />
          </div>
        </div>
        <div className="homes">
            {showHomes.length?(showHomes.map(home=>(
            <HomeCard key={home.id} {...home}/>
            ))):(<>
              <h2 className="no-home">خانه ای با این مشخصات پیدا نشد</h2>
            </>)}
        </div>
      </div>
    </>
  );
}
