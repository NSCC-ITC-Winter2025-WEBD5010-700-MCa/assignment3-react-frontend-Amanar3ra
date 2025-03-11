import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MusicForm from './MusicForm';

function MusicEdit(){

    const { id } = useParams()
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {data} = useQuery({
        queryKey: ['music', id],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_MUSIC_API_URL}/${id}`);
            return response.json()
        }
    })

    const editMusicMutation = useMutation({
      mutationFn: async (data) => {
        const response = await fetch(`${import.meta.env.VITE_MUSIC_API_URL}/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['musicData'])
        navigate('/admin/music')
      }
    });

    const processData = (data) => {
        editMusicMutation.mutate(data)
    };

    return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Music - Id: {data?.id}</h2>
      <MusicForm onDataCollection= {processData} initialData = {data}/>
    </div>
    )
}

export default MusicEdit;