import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import MusicForm from './MusicForm';

const MusicCreate = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const processData = (data) => {
        createMusicMutation.mutate(data)
    }

    const createMusicMutation = useMutation({
        mutationFn: async (data) => {

            const formattedData = {
                ...data,
                ratings: {
                    rym: data['ratings.rym']
                }
            };

            delete formattedData['ratings.rym'];

            const response = await fetch(`${import.meta.env.VITE_MUSIC_API_URL}`, {
              method: 'POST',
              headers: {'Content-Type' : 'application/json'},
              body: JSON.stringify(formattedData)
            })

            return response.json()
        },
        onSuccess : () => {
            queryClient.invalidateQueries(['musicData']),
            navigate('/admin/music')
        },
    })

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-center">Create a New Song</h2>
            <MusicForm onDataCollection = {processData}/>
        </div>
    )
}

export default MusicCreate;