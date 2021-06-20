import React, {useState, useEffect} from 'react'
import axios from './axios';
import './Row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    // state ;  keep track movies - store some information
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    // useEffect; A snippet of code which runs based on a specific condition/variable
    useEffect(() => {
        // if [], run once when the row loads and dont run again
        async function fetchData() {
            const request = await axios.get(fetchUrl); // fetchUrl <- App.js 에서 Row component 별 속성에 부여된 주소를 따라
            console.log(request);
            // console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]); // dependency; []안에 외부 데이터 가져오는 거 꼭 넣어야 함.. rerender 하기 위함임.
    // we need to tell useEffect that you;re using this variable which is outside the bock
    // because that way useEffect know that something changes so i need to refile the code
    // if url changes

    // trailer 옵션 정의
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        }
        // if there was already a trailer url -> if the video was open and clicked the pic: video playing
        // clear it and hide the video
        else {
            // youtube에서 trailer 비디오 찾는 기능 (영화 이름 기준) 
            movieTrailer(movie?.name || "")
                .then((url) => {
                    // https://www.youtube.com/watch?v=v1Etjs0XEIs&t=18s -> exact id v = "v1Etjs0XEIs" 찾기  
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                }).catch(error => console.log(error));
        }
    };

    return (
        <div className="row">
            {/* title */}
            <h2>{title}</h2>
            {/* contianer -> posters */}
            <div className="row__posters">
                {movies.map((movie) => (
                    // poster_path 형태가 base_url 의 / ~ 뒤에 올 주소형태
                <img
                    key={movie.id} // 대량의 데이터를 렌더할 때 key를 주는 것이 리액트 국룰
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                        onClick = {()=>handleClick(movie)}
                        />))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            {/* trailer Url존재하면서 && 일 때~ */}
        </div>
    )
}

export default Row
