import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import MusicTable from "../components/music/MusicTable"

const Music = () => {

    const location = useLocation()

    const { isPending, error, data: music } = useQuery({
        queryKey: ['musicData'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_MUSIC_API_URL}`);
            return response.json() //returns a promise of our data
        },
        staleTime: Infinity //cache the data & store it locally
    }) 

    if(error) return <div>{`An error has occured: ${error.message}`}</div>;

    return (
      <div>
        <h1 className="text-2xl font-bold">Music</h1>

        {location.pathname === '/admin/music' ? (
            isPending ?
            <div>Loading...</div> 
            :
            <MusicTable music = {music} />
        ) 
        
        : 
        
        <Outlet/>
        }
    </div>
    );
};

export default Music;
  