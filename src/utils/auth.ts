import { useState, useEffect } from "react"
import { User } from "~/pages/api/auth/me"


export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => {
                if (res.status === 401) {
                    return null
                } else {
                    return res.json()
                }
            })
            .then((user) => {
                setCurrentUser(user)
                setLoading(false)
            })
            .catch((error) => {
                setError(error)
                setLoading(false)
            })
    }, [])

    return { currentUser, loading, error }
}