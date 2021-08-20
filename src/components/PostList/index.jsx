import React from 'react';
import PropTypes from 'prop-types';

function PostList({ posts = [] }) {
    return (
        <ul>
            {posts.map((p, i) => (
                <li key={p.id}>{p.title}</li>
            ))}
        </ul>
    );
}

export default PostList;