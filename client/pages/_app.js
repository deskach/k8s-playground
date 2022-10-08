import 'bootstrap/dist/css/bootstrap.css'
import Header from "../components/Header";
import {buildHttpClient} from "../core/api";

const AppComponent = ({Component, pageProps, currentUser}) => {
    return (
        <>
            <Header currentUser={currentUser}/>
            <div className="container">
                <Component {...pageProps} currentUser={currentUser} />
            </div>
        </>
    )
}

AppComponent.getInitialProps = async ({Component, ctx}) => {
    const pageProps = !!Component?.getInitialProps ? Component.getInitialProps(ctx) : {};
    const res = await buildHttpClient(ctx?.req?.headers).get("/users/current-user");

    return {pageProps, currentUser: res?.data?.currentUser};
}

export default AppComponent