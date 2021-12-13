import React, { useState, useMemo, useEffect} from 'react';
import Counter from './components/Counter.js';
import PostForm from './components/PostForm.js';
import PostFilter from './components/PostFilter.jsx';
import PostList from './components/PostList.js';
import FormikTest from './components/FormikTest/FormikTest.js';
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import Loader from "./components/UI/Loader/Loader";
import MySelect from "./components/UI/select/MySelect";
import MyModal from "./components/UI/MyModal/MyModal.jsx";
import {usePosts} from './hooks/usePosts.js';
import PostService from './API/PostService.js';
import './App.css';
import axios from 'axios';


function App() {

  useEffect(()=>{
    fetchPosts()
  },[])

  const [posts, setPosts] = useState([
    { id: 1, title: "zzz", body: "aaaaa" },
    { id: 2, title: "xxx", body: "cccc" },
    { id: 3, title: "ddd", body: "bbbb" },
  ]);

  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [isPostLoading, setIsPostLoading] = useState(false);
  /*  const [selectedSort, setSelectedSort] = useState('');
   const [searchQuery, setSearchQuery] = useState(''); */


  /* function getSortedPosts(){
    console.log('1111111111111111111111111')
    // если нажали на селект сортировки то selectedSort отработает и в PostList попадет отсартированый масив, а если не то изначальный
    if(selectedSort){
      return [...posts].sort((a,b) => a[selectedSort].localeCompare(b[selectedSort]))//сдесь используеться sort(), она мутирует обьект поэтому мы используме не обьект posts а его копию [...posts], тут сложная сортировка, я не вкурил пока. надо разбиратьсяс sort()
    }
    return posts
  } */
/*   let sortedPosts = useMemo(() => {
    console.log('1111111111111111111111111') */
    // если нажали на селект сортировки то selectedSort отработает и в PostList попадет отсартированый масив, а если не то изначальный
/*     if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.query]))//сдесь используеться sort(), она мутирует обьект поэтому мы используме не обьект posts а его копию [...posts], тут сложная сортировка, я не вкурил пока. надо разбиратьсяс sort()
    }
    return posts
  }, [filter.sort, posts]) */

/*   const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
  }, [filter.sort, filter.query]) */


  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  async function fetchPosts(){
    setIsPostLoading(true)
    const posts = await PostService.getAll()
     setPosts(posts.data)
     setIsPostLoading(false)
   // console.log(response.data)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  /* const sortPosts = (sort) => {
    setSelectedSort(filter.sort)// это для того что бы замкнуть выбраное значение и сделать компоненту упровляемой
  } */



  return (
    <div className="App">
      <MyButton onClick={()=> fetchPosts()}>
        достать посты
      </MyButton>
      <MyButton onClick={()=> setModal(true)}>
        coздать пост
      </MyButton>
      <MyModal visible={modal}  setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <PostFilter filter={filter} setFilter={setFilter} />
      {isPostLoading
      ?<div style={{display: 'flex', justifyContent: 'center'}}> <Loader/> </div>
      :<PostList posts={sortedAndSearchedPosts} title={"post list"} removePost={removePost} />
      }
      
      {/*  <FormikTest name="vasj" /> */}
    </div>
  );
}

export default App;
