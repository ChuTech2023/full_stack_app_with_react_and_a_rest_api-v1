import { createContext, useState } from "react";
import Cookies from "js-cookie";

import { api } from "../utils/apiHelper";

const UserContext = createContext(null);


//user provider contains signin and signout method
export const UserProvider = (props) => {
    const cookie = Cookies.get("authenticatedUser");

    //states contain logged in user
    const [user, setUser] = useState(cookie ? JSON.parse(cookie) : null);

    //handle login user, save and update user state
    const signIn = async (credentials) => {
        const response = await api("/users", "GET", null, credentials);
        if (response.status === 200) {
            const userData = await response.json();
            userData.password = credentials.password;
            setUser(userData);
            Cookies.set("authenticatedUser", JSON.stringify(userData), { expires: 1 })
            return userData
        } else if (response.status === 401) {
            return null
        } else {
            throw new Error();
        }
    }

    //signout user and reset user state, remove auth cookie
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