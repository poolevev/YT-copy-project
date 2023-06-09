import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Loader from "./Loader";
import Videos from "../homePage/Videos";
import { makeAPICall } from "../../utils/makeAPICall";
import { getTimeDifference } from "../../utils/getTimeDifference";
import historyManager from "../../models/HistoryManager";
import Comments from "./Comments/Comments";
import AddToPlaylistBtn from "./AddToPlaylistBtn";
import categoriesManager from "../../models/CategoriesManager";
import { AiOutlineLike, AiOutlineDislike, AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import styles from "./VideoPlayerPage.module.scss";

const VideoPlayerPage = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();
  const loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
  const alreadyViewedVideo = historyManager.allHistory.find(
    (videoHistory) => videoHistory.videoID === id && videoHistory.username === loggedUser?.username
  );
  const [likesVideoSnippet, setLikesVideoSnippet] = useState(null);
  const [isLikeClicked, setIsLikeClicked] = useState(alreadyViewedVideo?.isLiked === true ? true : false);
  const [isDislikeClicked, setIsDislikeClicked] = useState(alreadyViewedVideo?.isLiked === false ? true : false);
  const [moreVideos, setMoreVideos] = useState(null);
  let videoSnippet = null;
  const [descriptionText, setDescriptionText] = useState("");
  const [isFullDescription, setFullDescription] = useState(false);
  const [logoLink, setLogoLink] = useState("../../img/logo.png");
  const [dateString, setDateString] = useState(null);

  function addToHistory() {
    historyManager.createHistoryItem(id, loggedUser, videoSnippet, alreadyViewedVideo?.isLiked);
  }

  function likeVideo() {
    if (isLikeClicked) {
      historyManager.createHistoryItem(id, loggedUser, likesVideoSnippet, null);
    } else {
      historyManager.createHistoryItem(id, loggedUser, likesVideoSnippet, true);
    }

    setIsLikeClicked(!isLikeClicked);
    setIsDislikeClicked(false);
  }

  function dislikeVideo() {
    if (isDislikeClicked) {
      historyManager.createHistoryItem(id, loggedUser, likesVideoSnippet, null);
    } else {
      historyManager.createHistoryItem(id, loggedUser, likesVideoSnippet, false);
    }

    setIsDislikeClicked(!isDislikeClicked);
    setIsLikeClicked(false);
  }

  function addTagToCategories(tag, userName) {
    categoriesManager.addCategory(tag, userName);
  }

  function handleShowMoreRelated() {
    setVideos(moreVideos);
  }

  function handleFullDescription(description) {
    setFullDescription(description);
  }

  useEffect(() => {
    makeAPICall(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setVideoDetail(data.items[0]);
      videoSnippet = data.items[0].snippet;
      setLikesVideoSnippet(videoSnippet);
      setDescriptionText(videoSnippet.description);
      setDateString(videoSnippet.publishedAt);

      if (loggedUser?.username) {
        addToHistory();
        addTagToCategories(videoSnippet.tags[0], loggedUser.username);
      }

      makeAPICall(`channels?part=snippet&id=${data.items[0].snippet.channelId}`).then((data) => {
        setLogoLink(data?.items[0].snippet.thumbnails.default.url);
      });
    });

    makeAPICall(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((data) => {
      setMoreVideos(data.items);
      setVideos(data.items.slice(0, 7));
    });
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle },
  } = videoDetail;
  const currentVideoArray = historyManager.allHistory.filter((videoHistory) => videoHistory.videoID === id);
  const localViewCount = currentVideoArray.length;
  const localLikeCount = currentVideoArray?.filter((video) => video.isLiked === true).length;
  const regex = /\b(https?:\/\/\S+)\b/g;

  return (
    <div className={styles.container}>
      <div className={styles.playerCommentsContainer}>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${id}`}
          className={styles.reactPlayer}
        
          controls
        />
        <h5 className={styles.title}>{title}</h5>

        <div className={styles.info}>
          <div className={styles.channelInfoContainer}>
            <Link to={`/channel/${channelId}`}>
              <img className={styles.channelLogo} src={logoLink} alt={"Channel Logo"} />
              <span className={styles.channelTitle}>{channelTitle}</span>
            </Link>
          </div>

          <div className={styles.btnsStatsContainer}>
            {loggedUser ? (
              <div className={styles.buttonsContainer}>
                <div className={styles.likeDislikeContainer}>
                  <button className={`${styles.likeBtn}`} onClick={likeVideo}>
                    {!isLikeClicked ? <AiOutlineLike /> : <AiTwotoneLike />}
                    <span className={styles.likeCount}> {parseInt(localLikeCount).toLocaleString()}</span>
                  </button>
                  <button className={`${styles.dislikeBtn}`} onClick={dislikeVideo}>
                    {!isDislikeClicked ? <AiOutlineDislike /> : <AiTwotoneDislike />}
                  </button>
                </div>
                <AddToPlaylistBtn className={styles.addToPlaylistBtn} videoID={id} />
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.descriptionTextContainer}>
          <span className={styles.viewCount}>
            {parseInt(localViewCount).toLocaleString()} views <BiTime /> {getTimeDifference(dateString)} ago
          </span>
          {!isFullDescription ? (
            <p
              className={styles.descriptionText}
              dangerouslySetInnerHTML={{ __html: `${descriptionText.slice(0, 300).replace(regex, '<a href="$1">$1</a>')}...` }}
            />
          ) : null}
          {isFullDescription ? (
            <p className={styles.descriptionText} dangerouslySetInnerHTML={{ __html: isFullDescription.replace(regex, '<a href="$1">$1</a>') }} />
          ) : null}
          {!isFullDescription ? (
            <button className={styles.showMoreBtn} onClick={() => handleFullDescription(descriptionText)}>
              Show more
            </button>
          ) : null}
          {isFullDescription ? (
            <button className={styles.showMoreBtn} onClick={() => handleFullDescription(false)}>
              Show less
            </button>
          ) : null}
        </div>
        <Comments videoID={id} />
      </div>

      <div className={styles.relatedVideos}>
        <Videos videos={videos} related={true} />
        <button className={styles.showMoreBtn} onClick={handleShowMoreRelated}>
          Show more
        </button>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
