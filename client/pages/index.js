// import {buildHttpClient} from "../core/api";
import {CurrentUser} from "../components/CurrentUser";

const LandingPage = ({currentUser}) => {
    return (
        <>
            <CurrentUser email={currentUser?.email}/>
            <h1>Landing Page</h1>
        </>
    )
}

// LandingPage.getInitialProps = async ({req}) => {
//     const res = await buildHttpClient(req?.headers).get("/users/current-user",);
//
//     return res?.data;
// }

export default LandingPage