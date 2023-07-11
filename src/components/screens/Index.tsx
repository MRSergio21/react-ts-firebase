import { Dialog } from '@headlessui/react';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';
import { useFirestore } from '~/lib/firebase';

type Tool = {
  id: string,
  title: string,
  descripction: string,
  url: string
}

function Index() {
  const { state } = useAuthState();
  const [ tools, setTools ] = useState<Array<Tool>>([]);
  const firestore = useFirestore();

  useEffect(() => {
    async function fetchData() {
      const toolsCollection = collection(firestore, "tools");
      const toolsQuery = query(toolsCollection);
      const querySnapshot = await getDocs(toolsQuery);
      const fetchedData: Array<Tool> = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() } as Tool);
      })
      setTools(fetchedData);
    }
    fetchData();
  }, [])

  return (
    <>
      <Head title="TOP PAGE" />
      <div className="hero min-h-screen">
        <div className='max-w-5xl mx-auto'>
          <div className='flex'>
            <input type="text" placeholder='title' className='m-4 bg-transparent border boder-slate-700 focus:ring-slate-400 focus:outline-none p-4 rounded-lg'/>
            <input type="text" placeholder='description' className='m-4 bg-transparent border boder-slate-700 focus:ring-slate-400 focus:outline-none p-4 rounded-lg'/>
            <input type="text" placeholder='url' className='m-4 bg-transparent border boder-slate-700 focus:ring-slate-400 focus:outline-none p-4 rounded-lg'/>
            <button type='submit' className='border border-purple-500 p-5'></button>
          </div>
          <table className='table w-full bg-transparent text-slate-50'>
            <thead>
              <tr>
                <th className='bg-slate-900 border border-slate-700'>Title</th>
                <th className='bg-slate-900 border border-slate-700'>Description</th>
                <th className='bg-slate-900 border border-slate-700'>Link</th>
              </tr>
            </thead>
            <tbody>
              {
                tools.map((tool) => (
                  <tr key={tool.id}>
                    <td className='bg-slate-800 border border-slate-700'>{tool.title}</td>
                    <td className='bg-slate-800 border border-slate-700'>{tool.descripction}</td>
                    <td className='bg-slate-800 border border-slate-700'>{tool.url}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Index;
