import { redirect } from "react-router-dom";

//  export async function requireAuth() {
//     const isLoggedIn = false;
//     if(!isLoggedIn) {
//         throw redirect("/login")
//     }
// }

export const requireAuth = async (request) =>{
    const pathname = new URL(request.url).pathname
    const isLoggedIn = localStorage.getItem("loggedIn")
    if(!isLoggedIn){
        let response =  redirect(`/login?message=You must log in first.&redirectTo=${pathname}`);
        response.body = true
        return response;
    }

    return null;
}
