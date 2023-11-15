"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update(){
    const [title, setTitle] =useState('');
    const [content, setContent]=useState('');
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    useEffect(()=>{
        fetch(process.env.NEXT_PUBLIC_API_URL+"topics/"+id)
        .then(resp=>resp.json())
        .then(result=>{
            setTitle(result.title);
            setContent(result.content);
        })
    },[])

    return(
        <form onSubmit={(e)=>{
            e.preventDefault(); //서버쪽으로 데이터를 전송해야하기 때문에 페이지가 전환되는데, 이 기본 동작을 방지함.
            const title = e.target.title.value; //target = form tag, title : name=title인 element 
            const content = e.target.content.value;
            const options = {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({title, content})
            }
            fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+id,options)
            .then(resp=>resp.json())
            .then(result=>{
                console.log(result);
                const lastid = result.id;
                router.push(`/read/${lastid}`); //방금 생성한 아이디의 페이지로 redirection
                router.refresh(); //서버 컴포넌트를 강제로 다시 랜더링 하는 기능
                
            })
        }}>
            <p>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="title" 
                    value={title} 
                    onChange={(e)=>setTitle(e.target.value)}/> {/* value값이 바뀌지 않으면 input안의 값은 바뀌지 않음. */}
            </p> 
            <p>
                <textarea 
                    name="content" 
                    placeholder="content" 
                    value={content} 
                    onChange={(e)=>setContent(e.target.value)}></textarea>
            </p>
            <p>
                <input type="submit" value="update"/>
            </p>
        </form>
    )
}


