import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import BooksTable from "../components/books/BooksTable"

const Books = () => {

    const { isPending, error, data: books } = useQuery({
        queryKey: ['booksData'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/books');
            return response.json() //returns a promise of our data
        },
        staleTime: Infinity //cache the data & store it locally
    }) 

    if(error) return <div>{`An error has occured: ${error.message}`}</div>;

    return (
      <div>
        <Outlet />
        <h1 className="text-2xl font-bold">Books</h1>
        {
            isPending ?
            <div>Loading...</div> 
            :
            <BooksTable books = {books} />
        }
    </div>
    );
};

export default Books;
  