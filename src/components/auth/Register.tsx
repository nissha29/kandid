import { useAuthDialogStore } from "@/store/store";
import { ArrowLeft } from "lucide-react";

export function Register() {
    const { setView } = useAuthDialogStore();

    return (
        <div className="bg-white max-w-sm rounded-xl shadow-md px-8 py-14 border border-neutral-300">
            <button onClick={() => setView("account")} className="flex items-center gap-1 text-neutral-500 hover:text-neutral-700 font-semibold text-sm hover:cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                Back
            </button>

            <h2 className="mt-8 text-2xl font-semibold">Register with email</h2>
            <p className="text-sm text-neutral-500 mt-1">
                Register using your email address.
            </p>

            <form className="mt-6 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col justify-start gap-2">
                        <label htmlFor="First Name" className="font-semibold text-sm text-neutral-800">First Name</label>
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col justify-start gap-2">
                        <label htmlFor="Last Name" className="font-semibold text-sm text-neutral-800">Last Name</label>
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-start gap-2">
                    <label htmlFor="Email" className="font-semibold text-sm text-neutral-800">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                <div className="flex flex-col justify-start gap-2">
                    <label htmlFor="Password" className="font-semibold text-sm text-neutral-800">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                </div>

                <button className="mt-3 w-full text-sm flex items-center justify-center gap-3 tracking-wider bg-accent-dark text-white font-semibold rounded-full py-2.5 transition hover:cursor-pointer hover:shadow-lg hover:shadow-accent-dark/30">
                    Create New Account
                </button>
            </form>

            <div className="mt-6 border-t border-neutral-200" />

            <p className="text-center text-sm mt-4 text-neutral-600">
                Already have an account?{" "}
                <button
                    onClick={() => setView("login")}
                    className="text-center mt-4 text-neutral-500 hover:text-neutral-800 text-sm font-semibold hover:cursor-pointer"
                >
                    <span className="hover:underline">Login</span>
                </button>
            </p>
        </div>
    );
}
