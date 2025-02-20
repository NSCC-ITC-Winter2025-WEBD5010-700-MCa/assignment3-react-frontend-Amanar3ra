import {useForm} from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const BookCreate = () => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const collectData = (data) => {
        createBookMutation.mutate(data)
    }

    const createBookMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch(`http://localhost:3000/books/`, {
              method: 'POST',
              header: {'Content-Type' : 'application/json'},
              body: JSON.stringify(data)
            })

            return response.json()
        },
        onSuccess : () => {
            queryClient.invalidateQueries(['booksData']),
            navigate('/admin/books')
        },
    })

    return (
        <div>
            <form onSubmit={handleSubmit(collectData)}
                className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4" >
                <h2 className="text-xl font-semibold text-center">Create a New Book</h2>

                <div className="space-y-2">
                    <label className="block text-gray-700">Title</label>
                    <input {...register('title', { required: 'Title is required' })} 
                    type="text" placeholder="Title"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-700">Author</label>
                    <input {...register('author', { required: 'Author is required' })} 
                    type="text" placeholder="Author"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-700">Published Year</label>
                    <input {...register('published_year', { required: 'Year is required' , min: { value: 1700, message: 'Year must be at least 1700' }})} 
                    type="text" placeholder="Publication year"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.published_year && <p className="text-red-500 text-sm mt-1">{errors.published_year.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-700">Genre</label>
                    <input {...register('genre', { required: 'Genre is required' })} 
                    type="text" placeholder="Genre"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
                </div>

                <button type="submit"
                className="w-full bg-blue-700 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-200"
                >
                    Create Book
                </button>
            </form>
        </div>
    )
}

export default BookCreate;