import React, { useState } from 'react';

export interface Movie {
  //Movie 인터페이스의 프로퍼티 지정

  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export interface MovieCardProps {
  //MovieCardProps가 받을 프로퍼티 지정

  movie: Movie;

  imageBaseUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, imageBaseUrl }) => {
  //MovieCard는 MovieCardProps라는 타입의 프로퍼티를 받을 함수형 컴포넌트임을 ts에게 알림,movie와 imgageBaseUrl 프로퍼티를 구조 분해 할당하여 사용

  const [isHovered, setIsHovered] = useState(false); //useState를 통해 마우스가 hover되었는지 안되었는지 상태를 저장

  return (
    <li
      key={movie.id}
      className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg

transform hover:scale-105 transition-transform duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {movie.poster_path && ( //movie.poster_path가 API에 존재하는가?(존재하지 않을 수도 있음) 있으면, imageBaseUrl이 저장하고있는 서버의 링크에 포스터에 대한 정보 요청
        <img
          className={`w-full h-auto

 ${isHovered ? 'filter blur-sm' : ''}

 transition-all duration-300`}
          src={`${imageBaseUrl}${movie.poster_path}`}
          alt={`${movie.title} 포스터`}
        />
      )}

      <h3 className="p-4 font-semibold text-center">{movie.title}</h3>

      {isHovered && ( //마우스가 hover되고, 줄거리가 존재하는 영화라면 overview를 통해 줄거리를 보여줌, 없다면 "줄거리 정보가 없습니다 표시"
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <p className="text-white text-sm text-center line-clamp-6">
            {movie.overview || '줄거리 정보가 없습니다.'}
          </p>
        </div>
      )}
    </li>
  );
};

export default MovieCard;
