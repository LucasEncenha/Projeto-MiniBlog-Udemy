import {Link} from "react-router-dom";

//hooks
import { useFetchDocuments } from "../../Hooks/useFetchDocuments";
import { useQuery } from '../../Hooks/useQuery';

//components
import PostDetail from "../../components/PostDetail";

//css
import styles from "./Search.module.css"

const Search = () => {
    const query = useQuery();
    const search = query.get('q');

    const {documents: posts} = useFetchDocuments('posts',search);

  return (
    <div className={styles.search_container}>
        <h2>Search {search}</h2>
        <div>
            {posts && posts.length === 0 && (
                <div className={styles.noposts}>
                    <p>Não foram encontrados posts a partir da sua busca...</p>
                    <Link to="/" className="btn btn-dark">
                        Voltar
                    </Link>
                </div>
            )}
            {posts && posts.map((post) =>
                <PostDetail key={post.id} post={post}/>)}
        </div>
    </div>
  )
}

export default Search;