import { signIn, useSession } from "next-auth/react";
import { Container } from "./Container";


export function LoginBanner() {
    const { data: session } = useSession();

    // if (session) {
    //     return null;
    // }
    
    return (

        <div className="bg-slate-500 w-full fixed bottom-0 p-4">
            <Container className="bg-transparent flex justify-between">
                <p className="text-white">Join the experience</p>
                <div>
                    <button 
                        onClick={() => signIn()}
                        className="shadow-md text-white px-4 py-2"
                    >
                        Login
                    </button>
                </div>
            </Container>
        </div>
    )
}
