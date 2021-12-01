import { useAuth } from '../lib/auth'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'
import Model from 'react-modal'
import { useRouter } from 'next/router'
import { db } from '../lib/firebase'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import CreatePost from '../components/CreatePost'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingScreen from '../components/LoadingScreen'
import Loader from '../components/Loader'
import Post from '../components/Post'
import Image from 'next/image'

Model.setAppElement('#__next')

export default function Home(){
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const [PostDetails, setPostDetails] = useState(null);
    const [UserDetails, setUserDetails] = useState(null);
    const [lastVisible, setlastVisible] = useState(null);
    const [checkstring, setcheckstring] = useState(null)

    useEffect(() => {
      db.collection("posts")
      .orderBy("timestamp", "desc")
      .limit(5)
      .onSnapshot((snapshot) => {
        var lastVisible = snapshot.docs[snapshot.docs.length-1];
        setlastVisible(lastVisible);
        const tempPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }));
        setPostDetails(tempPosts);
      });
    
        db.collection("users")
          .limit(5)
          .onSnapshot((snapshot) => {
            const tempUsers = snapshot.docs.map((doc) => ({
              username: doc.username,
              UserDetail: doc.data(),
            }));
            setUserDetails(tempUsers);
    
          });
    
      }, []);


      const postIndex = () => {
        db.collection("posts")
        .orderBy("timestamp", "desc")
        .startAfter(lastVisible)
        .limit(5)
        .onSnapshot((snapshot) => {
          var lastVisible = snapshot.docs[snapshot.docs.length-1];
            setlastVisible(lastVisible);
          const tempPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }));
          setPostDetails(PostDetails => [...PostDetails, ...tempPosts])
        });
        setcheckstring(lastVisible.id)
      }

    const gotologin = () => {
      router.push('/login')
    }

    return(
        <>
        <Head>
          <title>Home</title>
        </Head>
        <div className="py-8 px-5 max-w-screen">
            {/* header */}
            <Header title="Home" />

            
            {loading ? <LoadingScreen/> : 
                <>
                {/* Check if user is loged */}
                {user ? 
                    <div className="w-full flex flex-row justify-evenly">
                        {/* post section */}
                        <div className="w-full md:w-7/12">
                            {/* upload post */}
                            <div className="py-8 md:max-w-3xl">
                                <Link href="/home?CreatePost=true" as="/home"><a>
                                    <div className="w-full p-3 bg-gray-750 text-white rounded-lg cursor-pointer">
                                        <p className="font-semibold">Escreva algo...</p>
                                    </div>
                                </a></Link>
                            </div>
                            {/* all post feed */}
                            <div className="w-full md:max-w-3xl">
                    
                                {PostDetails == null ? <Loader/> :
                                    <InfiniteScroll
                                      dataLength={PostDetails.length}
                                      next={postIndex}
                                      hasMore={lastVisible ? <>{lastVisible.id == checkstring ? false : true}</>: null}
                                      loader={<Loader/>}
                                      endMessage={ <h4 className="text-center font-bold mb-4 text-white">Fim</h4> }
                                    >
                                       
                                      { 
                                        PostDetails.map((post, Index) => (
                                          <Post
                                          key={Index}
                                          id={post.id}
                                          username={post.post.username}
                                          imageUrl={post.post.imageUrl}
                                          caption={post.post.caption}
                                          />
                                        ))
                                      }
                                    </InfiniteScroll>
                                }               
                            </div>
                        </div>
                        
        
                          {UserDetails ?
                          // Explore profile section
                          <div className="hidden py-8 md:max-w-lg md:block md:w-4/12">
                            <div className="hidden bg-gray-750 w-full rounded-lg p-3 md:flex md:flex-col">
                              <p className="font-semibold text-white">Veja outros perfis</p>
                              {UserDetails.map(user => (
                                <div key={user.UserDetail.username} className="text-white rounded-lg bg-gray-850 my-3 p-3">
                                  <Link href={user.UserDetail.username}><a>
                                    <div className="flex items-center w-full">
                                      <div className="h-8 w-8 rounded-md overflow-hidden mr-2 relative"><Image alt="imagem não encontrada" src={user.UserDetail.profileimage} layout="fill"/></div>
                                      <p className="uppercase font-semibold">@{user.UserDetail.username}</p>
                                    </div>
                                    <div className="p-2 rounded-lg mt-2 bg-gray-750">
                                      <p>{user.UserDetail.bio}</p>
                                    </div>
                                  </a></Link>
                                </div>
                              ))}
                            </div>
                          </div>
                          : null }
                        </div>
                : gotologin() }
                </>
            }

            <Footer active="home"/>
        </div>
        <Model isOpen={!!router.query.CreatePost} className="Model" overlayClassName="Overlay">
            <CreatePost/>
        </Model>
        </>
    )
}