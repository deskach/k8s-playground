import 'bootstrap/dist/css/bootstrap.css'

const app =  ({ Component, pageProps}) => {
    //^ This is needed to pick up bootstrap.css globally
    return <Component {...pageProps} />
}

export default app