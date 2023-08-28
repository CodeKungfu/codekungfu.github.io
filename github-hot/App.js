const { useState, useEffect, useRef } = React;
const { createRoot } = ReactDOM;
import { Nav } from "./components/Nav.js";
import { List } from "./components/List.js";
import { Modal } from "./components/Modal.js";

const App = () => {
  const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [hotGithubRes, setHotGithubRes] = useState([]);
    const [queryParams, setQueryParams] = useState({
      page: 1,
      language: getUrlLanguage()
    });
    const cacheGithubRes = useRef({});
    const [error, setError] = useState('');  
    const onChange = (language) => {
      setError(null);
      setQueryParams({
        language,
        page: 1,
      });
      const storageRepos = cacheGithubRes.current?.[language] || [];
      if (storageRepos.length > 0) {
        setHotGithubRes(storageRepos);
      } else {
        setHotGithubRes([]);
        getGithubData(language, 1);
      }
      window.history.replaceState({}, "", `?language=${language}`);
    };

    useEffect(() => {
      getGithubData(queryParams.language, queryParams.page);
    }, []);

    const getGithubData = (lang, page) => {
      setLoading(true);
      setError(null);
      const url = getRequestUrl(lang, page);
      fetch(url)
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => {
          const items = data?.items || [];
          const newItems = page === 1 ? items : [...hotGithubRes, ...items];
          setHotGithubRes(newItems);
          if (page === 1) {
            if (cacheGithubRes.current) {
              cacheGithubRes.current[lang]=newItems;
            }
          }
          setTotal(data?.total_count || 0);
        })
        .catch((error) => {
          error.json().then((err) => {
            setError(err?.message || "Error");
          });
        })
        .finally(() => setLoading(false));
    };
  
    const fetchNext = () => {
      if (loading) {
        return;
      }
      if (error) {
        return;
      }
      setQueryParams({
        ...queryParams,
        page: queryParams.page + 1,
      });
      getGithubData(queryParams.language, queryParams.page + 1);
    }
    return (
      <>
          <Nav
            language={queryParams.language}
            change={onChange}
          />
          <Modal
            error={error}
          />
          <List
            error={error}
            load={loading}
            items={hotGithubRes}
            total={total}
            loadMore={() => {
              fetchNext();
            }}
          ></List>
      </>
    );
};

const reactRoot = createRoot(document.getElementById('root'));
reactRoot.render(<App />);