import React from "react";
import '../index.css';
import Sidebar from "../components/SidebarInversionista/Sidebar";
import PostList from "../components/PostList";
import CatImg from "../assets/cat.jpg";



//posts has values to test update creation
const posts = [
  {
    id: 1,
    avatar: CatImg,
    author: 'John Doe',
    text: 'Hello world test test test test test test test test !',
    date: 'May 1, 2023'
  },
  {
    id: 2,
    avatar: CatImg,
    author: 'Jane Smith',
    text: 'How are you?',
    date: 'May 2, 2023'
  }
];

/*Esta es la pagina que se muestra al seleccionar una opcion del menu principal*/
function Updates() {
  return (
    <div >
      <div className="flex h-screen items-center justify-center text-5xl bg-grey text-white">
      <Sidebar />

      <div>
      <PostList posts={posts}/>
      </div>
        </div>
      
    </div>
  );
}

export default Updates;
