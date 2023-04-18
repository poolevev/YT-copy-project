import React from 'react';
import { Card } from 'react-bootstrap';
import styles from './ChannelCard.module.scss';

const ChannelCard = ({ channelDetail }) => (

    <Card className={styles.channelCard} >

        <Card.Img
            src={channelDetail?.snippet?.thumbnails?.high?.url}
            alt={channelDetail?.snippet?.title}
            className={styles.channelCardImage}
        />

        <Card.Body className={styles.channelCardBody}>
            <Card.Title className={styles.channelCardTitle}>
                {channelDetail?.snippet?.title}{' '}
            </Card.Title>
            {channelDetail?.statistics?.subscriberCount && (
                <Card.Text className={styles.channelCardText}>
                    {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString('en-US')} Subscribers
                </Card.Text>
            )}
        </Card.Body>

    </Card>

);

export default ChannelCard;
