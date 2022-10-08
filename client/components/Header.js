import Link from 'next/link'
import {useRouter} from "next/router";

const Header = ({currentUser}) => {
    const isSignedIn = !!currentUser?.email
    const router = useRouter();
    const isCurrentPage = href => router.pathname.endsWith(href);
    const links = [
        {
            label: 'Sign Up',
            href: '/auth/signup',
            isVisible: (lnk) => !isSignedIn && !isCurrentPage(lnk.href)
        },
        {
            label: 'Sign In',
            href: '/auth/signin',
            isVisible: (lnk) => !isSignedIn && !isCurrentPage(lnk.href)
        },
        {label: 'Sign Out', href: '/auth/signout', isVisible: _ => isSignedIn},
    ].filter(l => l.isVisible(l))

    return (
        <nav className="navbar navbar-light bh-light">
            <Link href="/">
                <a className="navbar-brand">Ticketing</a>
            </Link>&nbsp;
            <div className="d-flex justify-content-end">
                <ul className="nav d-flex align-items-center">
                    {links.map(l => (
                        <li className="nav-item" key={l.href}>
                            <Link href={l.href}>
                                <a className="nav-link">{l.label}</a>
                            </Link>&nbsp;
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Header