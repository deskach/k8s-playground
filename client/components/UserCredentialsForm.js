import {useCallback, useState} from "react";

export const UserCredentialsForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = useCallback(e => {
        if (props.onSubmit) {
            e.preventDefault();

            props.onSubmit(email, password);
        }
    }, [email, password, props.onSubmit])

    return (
        <form onSubmit={handleSubmit}>
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
                {props.btnSubmitCaption}
            </button>
        </form>
    )
}

UserCredentialsForm.defaultProps = {
    onSubmit: _ => _,
    btnSubmitCaption: "Submit",
}