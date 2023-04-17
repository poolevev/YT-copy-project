import React, { useState } from 'react';
import { Dropdown, Form, Button } from 'react-bootstrap';
import styles from './AddToPlaylistBtn.module.scss';
import playlistsManager from '../../models/PlaylistsManager';
import { Playlist } from "../../models/PlaylistsManager"
import { v4 as uuid } from 'uuid';

const AddToPlaylistBtn = ({ videoID }) => {
    const loggedUser = JSON.parse(localStorage.getItem('LoggedUser'));
    const allPlaylists = JSON.parse(localStorage.getItem('AllPlaylists') || '[]');
    const userPlaylists = allPlaylists.filter(
        (playlist) => playlist.username === loggedUser?.username
    );
    const [selectedPlaylists, setSelectedPlaylists] = useState(userPlaylists.filter((playlist) => playlist.videos.includes(videoID)));
    const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    console.log(selectedPlaylists)

    const handleSelectPlaylist = (playlist) => {
        let selectedPlaylistIndex = selectedPlaylists.findIndex(playlistItem => playlistItem.playlistID === playlist.playlistID);
        console.log(selectedPlaylistIndex);

        if (selectedPlaylistIndex > -1) {
            console.log("videoId was in the list. remove");
            selectedPlaylists.splice(selectedPlaylistIndex, 1)
            setSelectedPlaylists([...selectedPlaylists]);
            playlistsManager.removeVideoFromPlaylist(playlist.playlistID, videoID);
        } else {
            playlist.videos.push(videoID);
            setSelectedPlaylists([...selectedPlaylists, playlist]);
            playlistsManager.addVideoToPlaylist(playlist.playlistID, videoID);
        }
    };

    const handleCreatePlaylist = () => {
        const playlistID = uuid();
        console.log(`Creating playlist: ${newPlaylistName}`);
        playlistsManager.createPlaylist(loggedUser.username, playlistID, newPlaylistName, [videoID]);
        playlistsManager.addVideoToPlaylist(playlistID, videoID);
        setSelectedPlaylists([...selectedPlaylists, new Playlist(loggedUser.username, playlistID, newPlaylistName, [videoID])]);
        console.log(selectedPlaylists)
        setNewPlaylistName('');
        setShowCreatePlaylist(false);
    };

    return (
        <span>
            <Dropdown onClick={() => {
                setShowDropdownMenu(!showDropdownMenu);
            }}>
                <Dropdown.Toggle variant="secondary" id="playlist-dropdown">
                    Add to playlist
                </Dropdown.Toggle>

                {showDropdownMenu ? (<Dropdown.Menu >

                    {userPlaylists.length > 0 ? (

                        userPlaylists.map((playlist) => (
                            <Dropdown.Item key={playlist.playlistName}>
                                <Form.Check
                                    type="checkbox"
                                    label={playlist.playlistName}
                                    checked={selectedPlaylists.find(playlistItem => playlistItem.playlistID === playlist.playlistID)}
                                    onChange={() => handleSelectPlaylist(playlist)}
                                />
                            </Dropdown.Item>
                        ))
                    ) : (
                        <span>No playlists yet</span>
                    )}

                    <Dropdown.Divider />

                    <Dropdown.Item
                        onClick={() => {
                            setShowCreatePlaylist(true);
                            setSelectedPlaylists([]);
                            setShowDropdownMenu(false);
                        }}
                    >
                        <button>Create new playlist</button>
                    </Dropdown.Item>
                </Dropdown.Menu>) : null}
            </Dropdown>
            {showCreatePlaylist && (
                <div className={styles.createPlaylist}>
                    <Form.Control
                        type="text"
                        placeholder="Enter playlist name"
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleCreatePlaylist}>
                        Create
                    </Button>
                </div>
            )}

        </span>
    );
};

export default AddToPlaylistBtn;
