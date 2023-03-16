import { Link } from 'react-router-dom';

import './UserForm.scss';

interface IUserForm {
    promptText?: string;
    promptLink?: { text: string; link: string };
    children: JSX.Element;
}

export default function UserForm({ promptText, promptLink, children }: IUserForm) {
    return (
        <div className='userForm'>
            {children}
            {promptText && promptLink && (
                <p className='userForm__prompt'>
                    {promptText} <Link to={promptLink.link}>{promptLink.text}</Link>
                </p>
            )}
        </div>
    );
}
