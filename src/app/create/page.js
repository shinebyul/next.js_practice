"use client"

import { useRouter } from "next/navigation";

export default function Create(){
    const router = useRouter();
    return(
        <form onSubmit={(e)=>{
            e.preventDefault(); //서버쪽으로 데이터를 전송해야하기 때문에 페이지가 전환되는데, 이 기본 동작을 방지함.
            const title = e.target.title.value; //target = form tag, title : name=title인 element 
            const content = e.target.content.value;
            const options = {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({title, content})
            }
            fetch(`${process.env.NEXT_PUBLIC_API_URL}topics`,options)
            .then(resp=>resp.json())
            .then(result=>{
                console.log(result);
                const lastid = result.id;
                router.push(`/read/${lastid}`); //방금 생성한 아이디의 페이지로 redirection
                router.refresh(); //서버 컴포넌트를 강제로 다시 랜더링 하는 기능
                
            })
        }}>
            <p>
                <input type="text" name="title" placeholder="title"/>
            </p> 
            <p>
                <textarea name="content" placeholder="content"></textarea>
            </p>
            <p>
                <input type="submit" value="create"/>
            </p>
        </form>
    )
}



// export default function Layout(props){
//     return(
//         <>
//             <h2>Create page</h2>
//             {props.children}
//         </>
//     )
// }