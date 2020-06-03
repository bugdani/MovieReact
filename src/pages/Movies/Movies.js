import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Row, Col, Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import moment from "moment";
import { URL_API, API_KEY, IMAGE_MOVIE } from "../../utils/constants";
import Loading from "../../components/Loading";
import ModalVideo from "../../components/ModalVideo";

import "./Movies.scss";

export default function Movies() {
  const { id } = useParams();

  const detailMovie = useFetch(
    `${URL_API}movie/${id}?api_key=${API_KEY}&language=en-US`
  );

  if (detailMovie.loading || !detailMovie.result) {
    return <Loading />;
  }
  return <RenderMovie movie={detailMovie.result} />;
}

function RenderMovie(props) {
  const {
    movie: { title, backdrop_path, poster_path },
  } = props;
  const backdropPath = `${IMAGE_MOVIE}${backdrop_path}`;

  return (
    <div
      className="movies"
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      <div className="movies__dark" />
      <Row>
        <Col span={8} offset={3} className="movies__poster">
          <PosterMovies image={poster_path} />
        </Col>
        <Col span={10} className="movies__info">
          <InfoMovie infoMovie={props.movie} />
        </Col>
      </Row>
    </div>
  );
}

function PosterMovies(props) {
  const { image } = props;
  const posterPath = `${IMAGE_MOVIE}${image}`;
  return <div style={{ backgroundImage: `url('${posterPath}')` }} />;
}

function InfoMovie(props) {
  const {
    infoMovie: { id, title, release_date, overview, genres },
  } = props;

  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const videoMovie = useFetch(
    `${URL_API}movie/${id}/videos?api_key=${API_KEY}&language=es-ES`
  );
  const openModal = () => setIsVisibleModal(true);
  const closeModal = () => setIsVisibleModal(false);

  const renderVideo = () => {
    if (videoMovie.result) {
      if (videoMovie.result.results.length > 0) {
        return (
          <>
            <Button icon={<PlayCircleOutlined />} onClick={openModal}>
              Ver trailer
            </Button>
            <ModalVideo
              videoKey={videoMovie.result.results[0].key}
              videoPlatform={videoMovie.result.results[0].site}
              isOpen={isVisibleModal}
              close={closeModal}
            />
          </>
        );
      }
    }
  };
  return (
    <>
      <div className="movies__info-header">
        <h1>
          {title}
          <span> {moment(release_date, "YYYY-MM-DD").format("YYYY")}</span>
        </h1>
        {renderVideo()}
      </div>
      <div className="movie__info-content">
        <h3></h3>
        <p>{overview}</p>
        <h3>Genero</h3>
        <ul>
          {genres.map((gender) => (
            <li key={gender.id}>{gender.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
