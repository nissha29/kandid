import { useAuthDialogStore } from "@/store/store";
import { ArrowLeft, Loader } from "lucide-react";
import Input from "../forms/Input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';

type RegisterFormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const { setView, setIsAuthDialogOpen } = useAuthDialogStore();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInputs>();

    const onSubmit = async (formData: RegisterFormInputs) => {
        try {
            setIsLoading(true);

            const res = await axios.post("/api/register", formData, {
                headers: { "Content-Type": "application/json" },
            });

            localStorage.setItem("authToken", res.data.token);
            toast.success('User registered successfully')
            setIsAuthDialogOpen(false);
            router.push("/dashboard");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.error || "Something went wrong");
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white max-w-sm rounded-lg shadow-md px-8 py-14 border border-neutral-300">
            <button
                onClick={() => setView("account")}
                className="flex items-center gap-1 text-neutral-500 hover:text-neutral-700 font-semibold text-sm hover:cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4" />
                Back
            </button>

            <h2 className="mt-8 text-2xl font-semibold">Register with email</h2>
            <p className="text-sm text-neutral-500 mt-1">
                Register using your email address.
            </p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 flex flex-col gap-4"
            >
                <div className="grid grid-cols-2 gap-3">
                    <Input
                        label="First Name"
                        placeholder="First Name"
                        error={errors.firstName?.message}
                        {...register("firstName", { required: "First name is required" })}
                    />
                    <Input
                        label="Last Name"
                        placeholder="Last Name"
                        error={errors.lastName?.message}
                        {...register("lastName", { required: "Last name is required" })}
                    />
                </div>

                <Input
                    label="Email"
                    type="email"
                    placeholder="Email"
                    error={errors.email?.message}
                    {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
                    })}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Password"
                    error={errors.password?.message}
                    {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "At least 6 characters required" },
                    })}
                />

                <button
                    type="submit"
                    className={`mt-3 w-full text-sm flex items-center justify-center gap-3 tracking-wider ${isLoading ? 'bg-accent-dark/40' : 'bg-accent-dark'} text-white font-semibold rounded-full py-2.5 transition hover:cursor-pointer hover:shadow-lg hover:shadow-accent-dark/30`}
                >
                    {isLoading ? <div className="flex gap-1 justify-center items-center"><Loader className="w-5 h-5 animate-spin" /> Creating account</div> : 'Create New Account'}
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
