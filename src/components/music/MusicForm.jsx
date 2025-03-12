import { useForm } from 'react-hook-form';
import { useEffect } from 'react';


export default function MusicForm({ onDataCollection, initialData }){
    const { register, handleSubmit, formState: {errors}, setValue } = useForm();

    useEffect(() => { //this only runs during initial renders of the form 
      console.log('Use effect ran:', initialData)
      if(initialData && initialData.ratings){
        //Pre-populate the form
        setValue('title', initialData.title)
        setValue('artist', initialData.artist)
        setValue('released_year', initialData.released_year)
        setValue('genre', initialData.genre)
        // setValue('ratings.rym', initialData.ratings.rym)
    }
    }, [initialData, setValue])

    return (
        <form onSubmit={handleSubmit(onDataCollection)} className="space-y-4">
        <div>
          <input
            {...register('title', { required: 'Title is required!' } )}
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <input
            {...register('artist', { required: 'Artist is required!' })}
            type="text"
            placeholder="Artist"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.artist && <p className="text-red-500 text-sm mt-1">{errors.artist.message}</p>}
        </div>
        <div>
          <input
            {...register('released_year', { required: 'Year is required!', min: { value: 1700, message: 'Year must be greater than 1700'} })}
            type="number"
            placeholder="Year"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.released_year && <p className="text-red-500 text-sm mt-1">{errors.released_year.message}</p>}
        </div>
        <div>
          <input
            {...register('genre', { required: 'Genre is required!' })}
            type="text"
            placeholder="Genre"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
        </div>
        {/* <div>
          <input
            {...register('ratings.rym', { required: 'Rating is required!' })}
            type="text"
            placeholder="Rating"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.ratings?.rym && <p className="text-red-500 text-sm mt-1">{errors.ratings.rym.message}</p>}
        </div> */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
        >
          Submit Song
        </button>
      </form>
    )
}