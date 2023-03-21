import { useState } from 'react';

import type { IAuthor } from '../../type';
import './Author.scss';
import avatar from '../../assets/images/avatar.svg';

interface IAuthorData {
    children?: JSX.Element;
    data: Omit<IAuthor, 'bio'>;
}

export default function Author({ children, data }: IAuthorData) {
    const BASE_IMAGE = avatar;

    const [image, setImage] = useState(data.image);

    const name = <h6>{data.username}</h6>;

    const info = children ? (
        <div className='author__wrap'>
            {name}
            {children}
        </div>
    ) : (
        name
    );

    return (
        <div className='author'>
            {info}
            <img src={image} onError={() => setImage(BASE_IMAGE)} alt='User avatar' />
        </div>
    );
}
