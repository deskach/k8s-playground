export const Errors = ({errors}) => {
    if (!errors?.length) {
        return null;
    }

    return (
        <div className="alert alert-danger">
            <ul className="my-0">
                {errors.map(({message}) => <li key={message}>{message}</li>)}
            </ul>
        </div>
    )
}