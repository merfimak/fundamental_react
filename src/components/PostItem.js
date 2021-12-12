import React from 'react';
import MyButton from "./UI/button/MyButton";

const Postitem = (props) => {
    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.nomber}</strong>
                <div>{props.post.title}</div>
                <div>{props.post.body}</div>
            </div>
            <MyButton onClick={() => props.removePost(props.post)} className="post__btns">delete</MyButton>
        </div>
    );
}

export default Postitem;
