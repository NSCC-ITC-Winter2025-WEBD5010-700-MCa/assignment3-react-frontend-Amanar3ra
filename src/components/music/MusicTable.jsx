import { useMutation , useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

const MusicTable = ({music}) => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deleteBookMutation = useMutation({

    mutationFn: async (id) => {
      const response = await fetch(`${import.meta.env.VITE_MUSIC_API_URL}/${id}`, {
        method: 'DELETE'
      })
      return response.json()
    },
    onSuccess : () => {
      queryClient.invalidateQueries(['musicData'])
    },

    onError: (error) => {
      alert('Unable to delete')
    }
  })

  const handleDelete = (id) => {
    //Send a delete request to our api to delete the selected record
    if(window.confirm(`Are you sure you wish to delete record ${id}?`)){
      deleteBookMutation.mutate(id)
    }
  }
    return (
    <>
      <p><Link to="/admin/music/create"
      className="bg-blue-700 text-white text-sm px-2 py-0 rounded-md shadow-sm hover:bg-blue-600 transition duration-200">
        Add New Song</Link></p>
      <table className="w-full border-collapse border border-gray-200">
      <thead className="bg-gray-200">
      <tr>
      <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Artist</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Released Year</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Genre</th>
      <th className="border border-gray-300 px-4 py-2">Ratings</th>
      </tr>
      </thead>
      <tbody>
      {music.map(music=>{
        return(
         <tr key={music.id} className="hover:bg-gray-100">
         <td className="border border-gray-300 px-4 py-2">{music.id}</td>
         <td className="border border-gray-300 px-4 py-2">{music.title}</td>
         <td className="border border-gray-300 px-4 py-2">{music.artist}</td>
         <td className="border border-gray-300 px-4 py-2">{music.released_year}</td>
         <td className="border border-gray-300 px-4 py-2">{music.genre}</td>
         <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
          <button className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600">Details</button>
          <button onClick={() => navigate(`/admin/music/${music.id}/edit`)} className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600">Edit</button>
          <button onClick={ () => {handleDelete(music.id) }} className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600">Delete</button>
         </td>
         </tr>)
  
      })}
  
     
      </tbody>
      </table>
    </>
    )
}
  
export default MusicTable;