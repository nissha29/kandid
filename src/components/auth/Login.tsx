import { ArrowLeft } from "lucide-react";
import { useAuthDialogStore } from "@/store/store";

export function Login() {
    const { setView } = useAuthDialogStore();

    return (
        <div className="bg-white w-sm rounded-xl shadow-md px-8 py-12 border border-neutral-300">
            <button onClick={() => setView("account")} className="flex items-center gap-1 text-neutral-500 hover:text-neutral-700 font-semibold text-sm hover:cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                Back
            </button>

            <h2 className="mt-8 text-2xl font-semibold">Login with email</h2>
            <p className="text-sm text-neutral-500 mt-1">
                Login using your email address.
            </p>

            <form className="mt-6 flex flex-col gap-4">
                <div>
                    <label className="text-sm font-semibold text-neutral-700">
                        Email or Username
                    </label>
                    <input
                        type="text"
                        placeholder="Enter email or username"
                        className="mt-1 w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold text-neutral-700">
                        Password
                    </label>
                    <div className="relative mt-1">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                        />
                    </div>
                </div>

                <button className="mt-3 w-full text-sm flex items-center justify-center gap-3 tracking-wider bg-accent-dark text-white font-semibold rounded-full py-2.5 transition hover:cursor-pointer hover:shadow-lg hover:shadow-accent-dark/30">
                    Login
                </button>
            </form>

            <div className="mt-10 border-t border-neutral-200" />

            <div className="flex justify-center gap-6 mt-4 text-sm">
                <button
                    type="button"
                    className="text-neutral-500 font-semibold hover:cursor-pointer hover:underline hover:text-neutral-800"
                >
                    Forgot password
                </button>
                <span className="text-neutral-300">|</span>
                <button
                    type="button"
                    onClick={() => setView("register")}
                    className="text-neutral-500 font-semibold hover:cursor-pointer hover:underline hover:text-neutral-800"
                >
                    Create New Account
                </button>
            </div>
        </div>
    );
}
