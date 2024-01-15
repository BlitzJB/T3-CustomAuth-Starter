import { useEffect, useState } from "react";

export default function Logout() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("/api/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            setLoading(false);
            window.location.href = "/";
        });
    }, []);

    return (<>
        <p>Logging out...</p>
        {
            loading && <p>Loading...</p>
        }
    </>);
}