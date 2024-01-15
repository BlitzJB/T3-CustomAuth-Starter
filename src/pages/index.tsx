import { useCurrentUser } from "~/utils/auth";

export default function Home() {
    const { currentUser, loading, error } = useCurrentUser();
    return (<>
        <a href="/login">Login</a><br />
        <a href="/register">Register</a><br />
        <a href="/logout">Logout</a><br />
        {JSON.stringify({ currentUser, loading, error })}
    </>);
}
