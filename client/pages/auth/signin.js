import {useRequest} from "../../hooks/useRequest";
import Router from "next/router";
import {Errors} from "../../components/Errors";
import {UserCredentialsForm} from "../../components/UserCredentialsForm";
import {useCallback} from "react";

const signIn = () => {
    const {doRequest, errors} = useRequest()
    const handleSubmit = useCallback(async function submitHandler(email, password) {
        const res = await doRequest(
            "/api/users/signin",
            'POST',
            {email, password}
        );

        if (res?.status < 300) { // on success redirect a user to the landing page
            await Router.push('/');
        }
    }, [])

    return (
        <div className="container">
            <Errors errors={errors}/>
            <h1>Sign in</h1>
            <UserCredentialsForm onSubmit={handleSubmit} btnSubmitCaption="Sign In"/>
        </div>)
}

export default signIn