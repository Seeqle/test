import { auth } from "@/src/lib/auth"
import { LoginButton, LogoutButton } from "../authButtons"
import Link from "next/link"


export default async function Home() {
    const session = await auth()
    return (

        <div>
            <div >
                <h1>
                    {session?.user
                        ? "Authentificated" + session?.user.email
                        : "not authentificated"}
                </h1>
                <div>
                    {!session?.user ?
                        <LoginButton /> : <LogoutButton />}
                </div>
            </div>
            <Link href="/register"> Register page</Link>
        </div>
    )
}