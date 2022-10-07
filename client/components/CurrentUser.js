export const CurrentUser = ({email} = null) => {
    if (!email) {
        return null;
    }

    return (
        <header>Signed in as {email}</header>
    )
}