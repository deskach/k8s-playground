import {useCallback} from "react";
import {useRequest} from "../../hooks/useRequest";
import Router from "next/router";
import {Errors} from "../../components/Errors";
import {UserCredentialsForm} from "../../components/UserCredentialsForm";

const signUp = () => {
    const {doRequest, errors} = useRequest()
    const handleSubmit = useCallback(async function submitHandler(email, password) {
        const res = await doRequest(
            "/users/signup",
            'POST',
            {email, password}
        );

        if (res?.status < 300) { // on success redirect a user to the landing page
            await Router.push('/');
        }
    }, [])

    return (
        <div>
            <Errors errors={errors}/>
            <h1>Sign up</h1>
            <UserCredentialsForm onSubmit={handleSubmit} btnSubmitCaption="Sign Up"/>
        </div>)
}

export default signUp