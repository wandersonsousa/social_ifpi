import Head from 'next/head'
import Link from 'next/link'
import Model from 'react-modal'
import Signup from './signup'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/auth'
import LoadingScreen from '../components/LoadingScreen'
import Image from 'next/image'

// select next div
Model.setAppElement("#__next");

export default function Home() {
  const router = useRouter();
  const { loading, user } = useAuth();

  const gotohome = () => {
    router.push('/home')
  }
  
  return (
    <>
    <Head>
      <title>SocialIFPI</title>
    </Head>
    {loading ? <LoadingScreen/> : 
      <>
      {/* check if user is loged in */}
      {user ? gotohome() : 
        <div className='w-screen h-screen flex flex-col justify-between py-14 items-center md:flex-row-reverse md:py-0'>
          {/* Right or top section */}
          <div className="text-white w-full px-12 flex flex-col h-2/3 justify-evenly md:w-3/6 md:h-3/6">
            <div className="h-12 w-12 relative"><Image alt="imagem broken" src="/logo.png" layout="fill" /></div>
            <h2 className="text-2xl font-bold my-5">Se inscreva gratuitamente</h2>
            <div>
              <Link href="/?signup=true" as="/signup"><a><div className="w-full py-3 bg-purple-550 text-center text-xl font-semibold rounded-lg mb-3 md:max-w-xs">Cadastrar</div></a></Link>
              <Link href="/login"><a><div className="w-full py-3 border-2 border-purple-550 text-purple-550 text-center text-xl font-semibold rounded-lg md:max-w-xs">Login</div></a></Link>
            </div>
          </div>
        
          {/* Left or bottom section */}
          <div className="w-full px-12 flex items-center py-10 mt-2 bg-gray-750 md:mt-0 md:w-3/6 md:h-full md:justify-center">
            <h1 className="text-white font-bold text-4xl md:text-7xl md:leading-normal">Social <br/>IFPI</h1>
          </div>
        </div>
      }
      </>
    }

    {/* Popup window for signup page */}
    <Model isOpen={!!router.query.signup} className="Model" overlayClassName="Overlay">
      <Signup/>
    </Model>
    </>
  )
}
