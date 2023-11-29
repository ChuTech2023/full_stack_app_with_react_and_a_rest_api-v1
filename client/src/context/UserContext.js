import { createContext, useState } from "react";
import Cookies from "js-cookie";

const UserContext = createContext(null);



export const UserProvider = (props) => {
    const cookie = Cookies.get("authenticatedUser");

    //states
    const [user, setUser] = useState(cookie ? JSON.parse(cookie) : null);

        const signIn = async (credentials) => {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${encodedCredentials}`
                }
            }
           const response = await fetch("http://localhost:5000/api/users", options);
           if (response.status === 200) {
                const userData = await response.json();
                setUser(userData);
                Cookies.set("authenticatedUser", JSON.stringify(userData), {expires: 1})
                return userData
           } else if(response.status === 401){
                return null 
           } else {
            throw new Error();
           }

        }

        const signOut = () => {
            setUser(null);
            Cookies.remove("authenticatedUser");
        }

  return (
    <UserContext.Provider value={{
        user,
        actions: {
            signIn,
            signOut
        }
    }}>
        {props.children}
    </UserContext.Provider>
    
  )
}

export default UserContext