import axios from 'axios';
import {API} from "../core/constants";
import {CurrentUser} from "../components/currentUser";

const LandingPage = ({currentUser}) => {
    console.debug("I am on the client, currentUser", currentUser)

    return (
        <>
            <CurrentUser email={currentUser?.email}/>
            <h1>Landing Page</h1>
        </>
    )
}

LandingPage.getInitialProps = async ({ req }) => {
    const url = `${API}current-user`;

    const res = await axios.get(url, {
        // headers: { Host: 'ticketing.com', }
        headers: req?.headers
    });

    console.log("I am on the server", url, res?.data);
    return res?.data;
}

export default LandingPage