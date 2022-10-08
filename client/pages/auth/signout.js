import {useEffect} from "react";
import Router from "next/router";
import {useRequest} from "../../hooks/useRequest";

export const SignOut = () => {
    const {doRequest} = useRequest()

    useEffect(() => {
        async function handleSignOut () {
            const res = await doRequest("/users/signout", 'GET');

            if (!res.status < 300) {
                return Router.push("/auth/signin");
            }
        }

        handleSignOut().catch(err => console.log(err.message))
    }, [])

    return <p>Signing you out...</p>
}

export default SignOut