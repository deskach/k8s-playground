import {useCallback, useState} from "react";

const signUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleOnSubmit = useCallback((e) => {
        e.preventDefault();
        console.log(email, password)
    }, [email, password])

    return (
        <form className="container" onSubmit={handleOnSubmit}>
            <h1>Sign up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input type="text" className="form-control" value={email}
                       onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
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