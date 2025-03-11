import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MusicForm from './MusicForm';

function MusicEdit(){
    const { id } = useParams()
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ['music', id],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_MUSIC_API_URL}/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch music data');
            }
            return response.json();
        }
    });

    const editMusicMutation = useMutation({
      mutationFn: async (data) => {
        const response = await fetch(`${import.meta.env.VITE_MUSIC_API_URL}/${id}`, {
          method: 'PUT', // Changed from PATCH to PUT to match your backend
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Failed to update music');
        }
        
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['musicData']);
        navigate('/admin/music');
      }
    });

    const processData = (data) => {
        editMusicMutation.mutate(data);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data found</div>;

    return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Music - Id: {data._id}</h2>
      <MusicForm onDataCollection={processData} initialData={data} />
    </div>
    );
}

export default MusicEdit;