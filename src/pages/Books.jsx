import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import BooksTable from "../components/books/BooksTable"

const Books = () => {

    //Get the current location information
    const location = useLocation()

    const { isPending, error, data: books } = useQuery({
        queryKey: ['booksData'],
        queryFn: async () => {
            // const response = await fetch('http://localhost:3000/books');
            const response = await fetch(`${import.meta.env.VITE_BOOKS_API_URL}`);
            return response.json() //returns a promise of our data
        },
        staleTime: Infinity //cache the data & store it locally
    }) 

    if(error) return <div>{`An error has occured: ${error.message}`}</div>;

    return (
      <div>
        <h1 className="text-2xl font-bold">Books</h1>

        {location.pathname === '/admin/books' ? (
            isPending ?
            <div>Loading...</div> 
            :
            <BooksTable books = {books} />
        ) 
        
        : 
        
        <Outlet/>
        }
    </div>
    );
};

export default Books;
  