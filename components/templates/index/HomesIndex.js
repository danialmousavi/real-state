import HomeCard from '@/components/modules/HomeCard';
import db from '@/data/db.json'
export default function HomesIndex() {
    console.log(db.homes);
    
  return (
    <div className="homes">
        {db.homes.slice(0,6).map(home=>(
        <HomeCard {...home}/>
        ))}
    </div>
  )
}
