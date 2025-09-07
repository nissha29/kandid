import { ArrowLeft, Loader } from "lucide-react";
import { useAuthDialogStore } from "@/store/store";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

type LoginFormInputs = {
  identifier: string;
  password: string;
};

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { setView, setIsAuthDialogOpen } = useAuthDialogStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (formData: LoginFormInputs) => {
    try {
      setIsLoading(true);

      const res = await axios.post("/api/auth/login", {
        email: formData.identifier,
        password: formData.password,
      });

      localStorage.setItem("authToken", res.data.token);
      toast.success('Logged in successfully')
      setIsAuthDialogOpen(false);
      router.push('/leads');
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
    <div className="bg-white w-sm rounded-lg shadow-md px-3 sm:px-8 py-12 border border-neutral-300">
      <button
        onClick={() => setView("account")}
        className="flex items-center gap-1 text-neutral-500 hover:text-neutral-700 font-semibold text-sm hover:cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <h2 className="mt-8 text-2xl font-semibold">Login with email</h2>
      <p className="text-sm text-neutral-500 mt-1">
        Login using your email address.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col gap-4"
      >
        <Input
          label="Email or Username"
          type="text"
          placeholder="Enter email or username"
          error={errors.identifier?.message}
          {...register("identifier", { required: "Email or username is required" })}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
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
          {isLoading ? <div className="flex gap-1 justify-center items-center"><Loader className="w-5 h-5 animate-spin" /> Logging in</div> : 'Login'}
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
