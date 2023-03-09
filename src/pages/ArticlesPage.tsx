import ContentPagination from '../components/ContentPagination';
import ArticlesList from '../components/ArticlesList';

export default function ArticlesPage() {
    return (
        <ContentPagination pageSize={5}>
            <ArticlesList />
        </ContentPagination>
    );
}
