import React from 'react';
import PostItem from './PostItem.js';

const Postlist = (props) => {
    if (!props.posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Посты не найдены!
            </h1>
        )
    }
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>{props.title}</h1>
            {props.posts.map((post, index) =>
                <PostItem removePost={props.removePost} nomber={index + 1} post={post} key={post.id} />
            )}
        </div>
    );
}

export default Postlist;
