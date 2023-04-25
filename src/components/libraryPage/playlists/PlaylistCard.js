import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PlaylistCard.module.scss"
import playlistsManager from "../../../models/PlaylistsManager";
import Card from 'react-bootstrap/Card';
import { makeAPICall } from "../../../utils/makeAPICall";
import ModalWindow from "../../UI/ModalWindow"

const PlaylistCard = ({ playlist, setPlaylists }) => {
    const navigate = useNavigate();
    const loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
    const [videoCard, setVideoCard] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        if (playlist.videos.length > 0) {
            makeAPICall(`videos?part=snippet&id=${playlist.videos[0]}`).then((data) =>
                setVideoCard(data?.items[0]?.snippet.thumbnails.standard.url)
            );
        }
    }, []);

    const handlePlaylistEdition = () => {
        loggedUser ? navigate(`/editPlaylistPage/${playlist.playlistID}`)
            : navigate("/login")

    };

    const handlePlaylistDeletion = (username, playlistID) => {
        playlistsManager.deletePlaylist(username, playlistID);
        const allCurrentPlaylists = JSON.parse(localStorage.getItem("AllPlaylists") || "[]");
        const userCurrentPlaylists = allCurrentPlaylists.filter(playlist => playlist.username === loggedUser?.username);

        setPlaylists(userCurrentPlaylists);
        // makeAPICall(`videos?part=snippet&id=${playlist.videos[0]}`).then((data) =>
        //     setVideoCard(data.items[0].snippet.thumbnails.standard.url)
        // );
    }

    return (
        <div className={styles.playlistCard} >
            <Card className={styles.playlistCardImg} onClick={() => handlePlaylistEdition()}>
                <Card.Img variant="top" src={videoCard || "https://icon-library.com/images/video-playlist-icon/video-playlist-icon-5.jpg"} />
            </Card>
            <div className={styles.playlistCardText}>
                <h4>{playlist.playlistName}</h4>
                <h5>{playlist.videos.length} Videos</h5>
            </div>
            <div className={styles.btnContainer}>
                {!!videoCard ? <button className={styles.playlistCardBtn} onClick={() => handlePlaylistEdition()} >Edit</button> : null}
                <button className={styles.playlistCardBtn} onClick={(e) => {
                    e.stopPropagation();
                    setModalShow(true);
                }} >Delete</button>
            </div>
            <ModalWindow key={playlist.playlistName + playlist.playlistID}
                show={modalShow}
                text={`Playlist ${playlist.playlistName} will be deleted`}
                deleteclick={(e) => {
                    handlePlaylistDeletion(playlist.username, playlist.playlistID);
                    e.stopPropagation();
                }}
                onHide={(e) => {
                    setModalShow(false);
                    e?.stopPropagation();
                }}
            />
        </div>
    )
}

export default PlaylistCard;