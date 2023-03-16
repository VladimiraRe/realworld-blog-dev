import './Container.scss';

export default function Container({ component }: { component: JSX.Element }) {
    return <div className='container'>{component}</div>;
}
