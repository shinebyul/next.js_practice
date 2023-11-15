"use client"
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export function Control() {
  const params = useParams(); 
  //URL에 포함되어있는 Key, Value 형식의 객체를 반환해주는 역할을 한다. Route 부분에서 Key를 지정해주고, 
  //해당하는 Key에 적합한 Value를 넣어 URL을 변경시키면, useParams를 통해 Key, Value 객체를 반환받아 확인
  const id = params.id;
  const router = useRouter();
  return (
    <ul>
      <li><Link href='/create'>create</Link></li>
      {id ? <>
        <li><Link href={`/update/${id}`}>update</Link></li>
        <li><input type='button' value='delete' onClick={()=>{
          const options = {method : 'DELETE'}
          fetch(process.env.NEXT_PUBLIC_API_URL + 'topics/'+id, options)
          .then(resp=>resp.json())
          .then(result=>{
            router.push('/');
            router.refresh();
          });
        }}/></li>
      </> : null}
    </ul>
  );
}
