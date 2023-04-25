import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './AddToPlaylistBtn.module.scss';
import playlistsManager from '../../models/PlaylistsManager';
import { Playlist } from "../../models/PlaylistsManager"
import { v4 as uuid } from 'uuid';
import { useParams } from "react-router-dom";
import ToastAlert from '../UI/ToastAlert';
import { BiAddToQueue } from "react-icons/bi"

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
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState("");

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
            setShowToast(true);
            setToastText(`Removed from the playlist: ${playlist.playlistName}`)
        } else {
            setSelectedPlaylists(prev => [...prev, playlist]);
            playlistsManager.addVideoToPlaylist(playlist.playlistID, videoID);
            setShowToast(true);
            setToastText(`Added to the playlist: ${playlist.playlistName}`)
        }
    };

    const handleCreatePlaylist = () => {
        const playlistID = uuid();
        if (newPlaylistName.length) {
            console.log(`Creating playlist: ${newPlaylistName}`);
            playlistsManager.createPlaylist(loggedUser.username, playlistID, newPlaylistName.trimEnd(), [videoID]);
            playlistsManager.addVideoToPlaylist(playlistID, videoID);
            setSelectedPlaylists(prev => [...prev, new Playlist(loggedUser.username, playlistID, newPlaylistName, [videoID])]);
            setNewPlaylistName('');
            setShowCreatePlaylist(false);
            setShowToast(true);
            setToastText(`Added to the created playlist: ${newPlaylistName}`);
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
            }}><BiAddToQueue /> Add to playlist </button>

            {showDropdownMenu ? (<div ref={dropdownMenuRef} className={styles.menu}>

                {userPlaylists.length > 0 ? (
                    <>
                        <span className={styles.selectText}>Select the playlist</span>

                        {userPlaylists.map((playlist) => (
                            <span key={playlist.playlistName}>
                                <Form.Check
                                    className={styles.playlistNameText}
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
            <ToastAlert show={showToast} close={() => setShowToast(false)} text={toastText} />
            {
                showCreatePlaylist && (
                    <div ref={createPlaylistRef} className={styles.createPlaylist}>
                        <Form.Control className={styles.inputPlaylist}
                            type="text"
                            required
                            placeholder="New playlist"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value.trimStart())}
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
