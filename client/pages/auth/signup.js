import {useCallback, useState} from "react";
import {useRequest} from "../../hooks/useRequest";
import Router from "next/router";
import {Errors} from "../../components/errors";

const signUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest()
    const handleOnSubmit = useCallback(async (e) => {
        e.preventDefault();

        const res = await doRequest(
            "/api/users/signup",
            'POST',
            {email, password}
        );

        if (res?.status < 300) { // on success redirect a user to the landing page
            await Router.push('/');
        }

    }, [email, password])

    return (
        <form className="container" onSubmit={handleOnSubmit}>
            <Errors errors={errors}/>
            <h1>Sign up</h1>
            <div className="form-control-group">
                <label>Email Address</label>
                <input type="text" className="form-control" value={email}
                       onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="form-control-group">
                <label>Password</label>
                <input type="password" className="form-control"
                       value={password} onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button className="btn btn-primary">
                Sign Up
            </button>
        </form>
    )
}

export default signUp