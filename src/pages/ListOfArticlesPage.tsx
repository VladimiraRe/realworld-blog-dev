import ContentPagination from '../components/ContentPagination';
import ArticlesList from '../components/ArticlesList';

export default function ListOfArticlesPage() {
    return <ContentPagination pageSize={5} content={ArticlesList} baseLink='articles' />;
}
