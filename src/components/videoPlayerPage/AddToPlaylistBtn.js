import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './AddToPlaylistBtn.module.scss';
import playlistsManager from '../../models/PlaylistsManager';
import { Playlist } from "../../models/PlaylistsManager"
import { v4 as uuid } from 'uuid';
import { useParams } from "react-router-dom";

const AddToPlaylistBtn = ({ videoID }) => {
    const loggedUser = JSON.parse(localStorage.getItem('LoggedUser'));
    const allPlaylists = JSON.parse(localStorage.getItem('AllPlaylists') || '[]');
    const userPlaylists = allPlaylists.filter(
        (playlist) => playlist.username === loggedUser?.username
    );
    const { id } = useParams();
    const [selectedPlaylists, setSelectedPlaylists] = useState(userPlaylists.filter((playlist) => playlist.videos.includes(id)));
    const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    useEffect(() => {
        setSelectedPlaylists(userPlaylists.filter((playlist) => playlist.videos.includes(id)))
    }, [id])

    const handleSelectPlaylist = (playlist) => {
        let selectedPlaylistIndex = selectedPlaylists.findIndex(playlistItem => playlistItem.playlistID === playlist.playlistID);


        if (selectedPlaylistIndex > -1) {
            console.log("videoId was in the list. remove");
            selectedPlaylists.splice(selectedPlaylistIndex, 1)
            setSelectedPlaylists(prev => [...selectedPlaylists]);
            playlistsManager.removeVideoFromPlaylist(playlist.playlistID, videoID);
        } else {
            //playlist.videos.push(videoID);
            setSelectedPlaylists(prev => [...prev, playlist]);
            playlistsManager.addVideoToPlaylist(playlist.playlistID, videoID);
        }
    };

    const handleCreatePlaylist = () => {
        const playlistID = uuid();
        if (newPlaylistName.length) {
            console.log(`Creating playlist: ${newPlaylistName}`);
            playlistsManager.createPlaylist(loggedUser.username, playlistID, newPlaylistName, [videoID]);
            playlistsManager.addVideoToPlaylist(playlistID, videoID);
            setSelectedPlaylists(prev => [...prev, new Playlist(loggedUser.username, playlistID, newPlaylistName, [videoID])]);
            console.log(selectedPlaylists)
            setNewPlaylistName('');
            setShowCreatePlaylist(false);
        }
    };

    const buttonRef = useRef(null);
    const createPlaylistRef = useRef(null);
    const dropdownMenuRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target) &&
                dropdownMenuRef.current &&
                !dropdownMenuRef.current.contains(event.target)
            ) {
                setShowDropdownMenu(false);
            }

            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target) &&
                createPlaylistRef.current &&
                !createPlaylistRef.current.contains(event.target)
            ) {
                setShowCreatePlaylist(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);




    return (
        <span className={styles.container}>
            <button className={styles.addToPlayListMainBtn} ref={buttonRef} onClick={() => {
                setShowDropdownMenu(!showDropdownMenu);
                setShowCreatePlaylist(false);
            }}> Add to playlist </button>

            {showDropdownMenu ? (<div ref={dropdownMenuRef} className={styles.menu}>

                {userPlaylists.length > 0 ? (
                    <>
                        <span className={styles.selectText}>Select the playlist</span>

                        {userPlaylists.map((playlist) => (
                            <span key={playlist.playlistName}>
                                <Form.Check
                                    type="checkbox"
                                    label={playlist.playlistName}
                                    checked={Boolean(selectedPlaylists.find(playlistItem => playlistItem.playlistID === playlist.playlistID))}
                                    onChange={() => {
                                        handleSelectPlaylist(playlist);
                                        setShowDropdownMenu(!showDropdownMenu);
                                    }}
                                />
                            </span>
                        ))}

                    </>) : (<span className={styles.infoText}>No playlists yet</span>)}

                <button className={styles.createPlaylistBtn}
                    onClick={() => {
                        setShowCreatePlaylist(!showCreatePlaylist);
                        setSelectedPlaylists([]);
                        setShowDropdownMenu(false);
                    }}>Create new</button>

            </div>) : null}

            {
                showCreatePlaylist && (
                    <div ref={createPlaylistRef} className={styles.createPlaylist}>
                        <Form.Control className={styles.inputPlaylist}
                            type="text"
                            required
                            placeholder="New playlist"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                        />
                        <button className={styles.createBtn} onClick={handleCreatePlaylist}>
                            Create
                        </button>
                    </div>
                )
            }

        </span >
    );
};

export default AddToPlaylistBtn;
