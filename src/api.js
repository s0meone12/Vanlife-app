import { initializeApp } from "firebase/app";
import { collection, doc, where, getDoc, getDocs, getFirestore} from "firebase/firestore";
import { query } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAWszJ6oojcJ0RqmpcOlLRUZ17T3z4z48U",
  authDomain: "vanlife-acb52.firebaseapp.com",
  projectId: "vanlife-acb52",
  storageBucket: "vanlife-acb52.appspot.com",
  messagingSenderId: "495760156661",
  appId: "1:495760156661:web:47050edad33c5a5c2ae2bc"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, "vans");


export async function getVans(){
    const querySnapshot = await getDocs(vansCollectionRef)
    console.log(querySnapshot)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}


export async function getVan(id){
   const docRef = doc(db, "vans", id);
   const vanSnapshot = await getDoc(docRef);
   return{
     ...vanSnapshot.data(),
     id: vanSnapshot.id
   }
}


export async function getHostVans() {
    const quer = query(vansCollectionRef, where("hostId", "==", "123"))
    const querySnapshot = await getDocs(quer)
    const vanArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    console.log("foo")
    return vanArr
   
}   

// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : "/api/vans"
// //     try{
// //     const res = await fetch(url)
// //     if (!res.ok) {
// //         console.error('API response error:', response.status, response.statusText, errorData);
// //         throw new Error(`API error: ${response.status} ${response.statusText}`);
// //     }
// //     const data = await res.json();
// //     return data.vans;

// // }   catch(error){
// //         throw new Response(JSON.stringify({message: error.message}), {status:400});
// //     }
//     try{
//         const res = await fetch(url);
//         if(!res.ok) {
//             console.log('API response error:', res.status, res.statusText);
//             throw new Error(`API error : ${res.status} ${res.statusText}`)
//         }
//         const data = await res.json();
//         return data.vans;

//     } catch(error){
//         throw new Response(JSON.stringify({message: error.message}), {status:400})
//     }

// }


// export async function getHostVans(id){
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
//     try{
//         const res = await fetch(url)
//         if(!res.ok){
//             throw new Response(JSON.stringify({message: 'Failed to fetch vans data'}), {status : res.status})
//         }
//         const data = await res.json();
//         return data.vans;

//     } catch(error){
//         throw new Response(JSON.stringify({message: error.message}), {status:400});
//     }
// }


export async function loginUser(creds) {
    const res = await fetch("/api/login", { method: "post", body: JSON.stringify(creds) })
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}