import styles from "./Dashboard.module.css";

import {Link} from "react-router-dom";

//hooks
import {useAuthValue} from "../../context/AthContext";
import {useFetchDocuments} from "../../Hooks/useFetchDocuments";

const Dashboard = () => {
  const {user} = useAuthValue();
  const uid = user.uid;

  const {documents: posts,loading} = useFetchDocuments("posts",null,uid);

  return (
    <div>
        <h1>Dashboard</h1>
        <p>Gerencie os seus posts</p>
        {posts && posts.length === 0 ? (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">Criar primeiro post</Link>
          </div>
        ) : (
          <div>
            <p>Tem posts!</p>
          </div>
        )}

        {posts && posts.map((post) => <h3>{post.title}{post.uid}</h3>)}
    </div>
  )
}

export default Dashboard;