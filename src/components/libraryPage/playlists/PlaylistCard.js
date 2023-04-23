import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./PlaylistCard.module.scss"
import playlistsManager from "../../../models/PlaylistsManager";
import Card from 'react-bootstrap/Card';
import { makeAPICall } from "../../../utils/makeAPICall";

const PlaylistCard = ({ playlist, setPlaylists }) => {

    const loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
    const [videoCard, setVideoCard] = useState(null);
    useEffect(() => {
        makeAPICall(`videos?part=snippet&id=${playlist.videos[0]}`).then((data) =>
            setVideoCard(data.items[0].snippet.thumbnails.standard.url)
        );

    }, []);

    const handlePlaylistDeletion = (username, playlistID) => {
        playlistsManager.deletePlaylist(username, playlistID);
        const allCurrentPlaylists = JSON.parse(localStorage.getItem("AllPlaylists") || "[]");
        const userCurrentPlaylists = allCurrentPlaylists.filter(playlist => playlist.username === loggedUser?.username);
        console.log(userCurrentPlaylists);

        setPlaylists(userCurrentPlaylists);
    }

    return (
        <div className={styles.playlistCard}>
            <Card style={{ width: '18rem', border: "none" }}>
                <Card.Img variant="top" src={videoCard || "https://img.icons8.com/ios/512/video-playlist.png"} />
                <Card.Body>
                    <Card.Text>
                        <h6>{playlist.playlistName}</h6>
                        <p>{playlist.videos.length} Videos</p>
                    </Card.Text>
                    <div className={styles.btnContainer}>
                        {loggedUser ? <Link to={`/editPlaylistPage/${playlist.playlistID}`}><button className={styles.cardBtn}  >Edit</button></Link>
                            : <Link to="/login">Login</Link>
                        }
                        <button className={styles.cardBtn} onClick={() => handlePlaylistDeletion(playlist.username, playlist.playlistID)} >Delete</button>
                    </div>

                </Card.Body>
            </Card>
        </div>
    )
}

export default PlaylistCard;