import { useRef, useState } from "react";

export default function Login() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        if (!email || !password) return alert("Email and password are required");
        setLoading(true);
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        setLoading(false);
        if (res.status === 200) {
            window.location.href = "/";
        } else {
            alert(await res.text());
        }
    }

    return (<>
        <input ref={emailRef} type="email" placeholder="Email" /><br />
        <input ref={passwordRef} type="password" placeholder="Password" /><br />
        <button onClick={handleLogin}>Login</button>
        {
            loading && <p>Loading...</p>
        }
    </>);
}