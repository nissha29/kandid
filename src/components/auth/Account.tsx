import { FcGoogle } from "react-icons/fc";
import { Mail, X } from "lucide-react";
import { useAuthDialogStore } from "@/store/store";
import toast from "react-hot-toast";
import { createAuthClient } from "better-auth/client";

export function Account() {
    const { setIsAuthDialogOpen, setView } = useAuthDialogStore();
    const authClient = createAuthClient();

    const signInWithGoogle = async () => {
        try {
            const response = await authClient.signIn.social({
                provider: 'google',
            });
            console.log('Google login response:', response);
            if (response && typeof response === 'object' && 'url' in response && typeof response.url === 'string') {
                window.location.href = response.url;
            } else {
                console.error('Google login error:', response);
                toast.error('Google login error');
            }
        } catch (error) {
            console.error('Google login error:', error);
            toast.error('Google login error');
        }
    };

    return (
        <div className="bg-white relative rounded-lg px-4 py-10 shadow-md">
            <div
                className="absolute inset-0 z-0 rounded-lg"
                style={{
                    background: "#ffffff",
                    backgroundImage:
                        "radial-gradient(circle at 0.3px 0.3px, rgba(0, 0, 0, 0.45) 0.5px, transparent 0)",
                    backgroundSize: "20px 20px",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 60%)",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "100% 100%",
                    maskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 60%)",
                    maskRepeat: "no-repeat",
                    maskSize: "100% 100%",
                }}
            />
            <button
                onClick={() => setIsAuthDialogOpen(false)}
                className="absolute top-5 right-5 text-white transition hover:cursor-pointer"
            >
                <X className="w-6 h-6 bg-neutral-400 rounded-full hover:bg-neutral-500" />
            </button>
            <div className="flex items-center justify-center rounded-lg">
                <div className="w-[380px] rounded-xl relative">

                    <h2 className="text-2xl font-semibold text-center">Continue with an account</h2>
                    <p className="text-neutral-500 text-center mt-1">
                        You must log in or register to continue.
                    </p>

                    <button onClick={signInWithGoogle} className="mt-6 w-full flex items-center justify-center gap-3 border border-neutral-400 rounded-full py-2.5 hover:bg-neutral-50 transition hover:cursor-pointer">
                        <FcGoogle size={16} />
                        <span className="text-neutral-700 font-semibold text-sm">Continue with Google</span>
                    </button>

                    <button onClick={() => setView("login")} className="mt-3 w-full text-sm flex items-center justify-center gap-3 tracking-wider bg-accent-dark text-white font-semibold rounded-full py-2.5 transition hover:cursor-pointer hover:shadow-lg hover:shadow-accent-dark/30">
                        <Mail size={16} />
                        <span>Login with Email</span>
                    </button>

                    <div className="mt-6 border-t border-neutral-400"></div>

                    <p className="text-center mt-4 text-neutral-500 hover:text-neutral-800 text-sm font-semibold">
                        <button
                            onClick={() => setView("register")}
                            className="hover:underline"
                        >
                            New User? Create New Account
                        </button>
                    </p>

                    <p className="text-sm text-neutral-500 text-center mt-4">
                        By continuing, you agree to our{" "}
                        <a href="#" className="underline hover:text-neutral-600">
                            Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a href="#" className="underline hover:text-neutral-600">
                            T&Cs
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
