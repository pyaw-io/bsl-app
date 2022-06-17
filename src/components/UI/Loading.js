import React from 'react';
import ReactLoading from 'react-loading';
import classes from './Loading.module.css'


const Loading = () => (
    <div className={classes.loading}>
	<ReactLoading type='spinningBubbles' color='#242430' height={'5%'} width={'5%'} />
    </div>
);

export default Loading;