import React, { useState, useMemo } from 'react';
import Counter from './components/Counter.js';
import PostForm from './components/PostForm.js';
import PostList from './components/PostList.js';
import FormikTest from './components/FormikTest/FormikTest.js';
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import MySelect from "./components/UI/select/MySelect";
import './App.css';

function App() {


  const [posts, setPosts] = useState([
    { id: 1, title: "zzz", body: "aaaaa" },
    { id: 2, title: "xxx", body: "cccc" },
    { id: 3, title: "ddd", body: "bbbb" },
  ]);
  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');


/* function getSortedPosts(){
  console.log('1111111111111111111111111')
  // если нажали на селект сортировки то selectedSort отработает и в PostList попадет отсартированый масив, а если не то изначальный
  if(selectedSort){
    return [...posts].sort((a,b) => a[selectedSort].localeCompare(b[selectedSort]))//сдесь используеться sort(), она мутирует обьект поэтому мы используме не обьект posts а его копию [...posts], тут сложная сортировка, я не вкурил пока. надо разбиратьсяс sort()
  }
  return posts
} */
let sortedPosts = useMemo( () => {
  console.log('1111111111111111111111111')
   // если нажали на селект сортировки то selectedSort отработает и в PostList попадет отсартированый масив, а если не то изначальный
   if(selectedSort){
    return [...posts].sort((a,b) => a[selectedSort].localeCompare(b[selectedSort]))//сдесь используеться sort(), она мутирует обьект поэтому мы используме не обьект posts а его копию [...posts], тут сложная сортировка, я не вкурил пока. надо разбиратьсяс sort()
  }
  return posts
}, [selectedSort, posts])

const sortedAndSearchedPosts = useMemo( () =>{
  return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery))
}, [sortedPosts, searchQuery])

  
const createPost = (newPost) =>{
  setPosts([...posts, newPost])
}

const removePost = (post) =>{
  setPosts(posts.filter(p => p.id !== post.id))
}

const sortPosts = (sort) => {
  setSelectedSort(sort)// это для того что бы замкнуть выбраное значение и сделать компоненту упровляемой
}



  return (
    <div className="App">
      <PostForm create={createPost}/>
      <MyInput
          placeholder="поиск ..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
      />
      <MySelect 
        defaultValue="cортировка"
        disabled // это тоже самаое что и disabled={true}
        value={selectedSort} 
        onChange={sortPosts}
        options={[
        {value: 'title', name: 'по названию'},
        {value: 'body', name: 'по опианию'}
      ]}/>
      <PostList posts={sortedAndSearchedPosts} title={"post list"} removePost={removePost}/>
      <FormikTest name="vasj" />
    </div>
  );
}

export default App;
