import { useRef, useState } from "react";

export default function Register() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const name = nameRef.current?.value;
        if (!email || !password || !name) return alert("Email and password and name are required");
        setLoading(true);
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, name }),
        });
        setLoading(false);
        if (res.status === 200) {
            window.location.href = "/";
        } else {
            alert(await res.text());
        }
    }

    return (<>
        <input ref={nameRef} type="text" placeholder="Name" /><br />
        <input ref={emailRef} type="email" placeholder="Email" /><br />
        <input ref={passwordRef} type="password" placeholder="Password" /><br />
        <button onClick={handleRegister}>Register</button>
        {
            loading && <p>Loading...</p>
        }
    </>);
}