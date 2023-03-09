import { useState } from 'react';

import type { IAuthor } from '../../type';
import './User.scss';
import avatar from '../../assets/images/avatar.svg';

interface IUser {
    children?: JSX.Element;
    data: IAuthor;
}

export default function User({ children, data }: IUser) {
    const BASE_IMAGE = avatar;

    const [image, setImage] = useState(data.image);

    const name = <h6>{data.username}</h6>;

    const info = children ? (
        <div className='user__wrap'>
            {name}
            {children}
        </div>
    ) : (
        name
    );

    return (
        <section className='user'>
            {info}
            <img src={image} onError={() => setImage(BASE_IMAGE)} alt='User avatar' />
        </section>
    );
}
