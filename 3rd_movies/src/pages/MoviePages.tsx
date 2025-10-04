import { useEffect, useState } from 'react';

import axios from 'axios';

import MovieCard from '../components/MovieCard'; 

import type { Movie } from '../components/MovieCard';




export default function MoviePage() {

  const [movies, setMovies] = useState<Movie[]>([]); //Movie타입의 상태를 기억할 것, 초기에는 아무런 데이터도 없으므로 []로 초기화



  useEffect(() => {

    const fetchMovies = async () => {//useEffect는 동기 함수만 콜백이 가능하기 때문에 내부에 비동기 함수인 fetchMovies를 먼저 정의하여 처리한 이후, 따로 fetchMovies를 호출하여 동기적으로 처리

      const {data} = await axios('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',{ //axios를 이용하여 해당 url에 GET 요청을 보냄 => 요청 시 headers의 Authorization 속성에 Bearer 토큰 방식의 인증 정보를 담아 보낸다.
        
        headers:{
        
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,

    },

  }

  );

    setMovies(data.results);
    console.log(data.results);

  };

    fetchMovies();

  }, []);



  const imageBaseUrl = "https://image.tmdb.org/t/p/w500"; //TMDB에서 이미지를 제공하는 url



  return (

    <div className="bg-gray-900 text-white min-h-screen">

    <div className="container mx-auto p-4">

    <h1 className="text-3xl font-bold mb-8 text-center">인기 영화 목록</h1>

    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

    {movies.map(movie => (//map을 통해 movies의 요소를 차례대로 배열의 형태로 반환

    

    <MovieCard key={movie.id} movie={movie} imageBaseUrl={imageBaseUrl} />

  ))}

  </ul>

  </div>

  </div>

  );

}