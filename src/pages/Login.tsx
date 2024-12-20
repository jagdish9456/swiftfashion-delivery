import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  mobile: z
    .string()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^\d+$/, "Must be only digits"),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (values.mobile === "9999000099") {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/");
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid mobile number",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-transparent py-8 px-4 sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
            <h1 className="text-4xl font-bold text-pink-500 text-center mb-2">
              zepto
            </h1>
            <h2 className="text-3xl font-bold text-white text-center mb-1">
              Groceries
            </h2>
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              delivered in 10 minutes
            </h3>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">+91</span>
                        </div>
                        <Input
                          placeholder="Enter Phone Number"
                          {...field}
                          type="tel"
                          disabled={isLoading}
                          className="pl-12 bg-white/90 border-0 text-gray-900 placeholder:text-gray-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-pink-300" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 rounded-full"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Send OTP"}
              </Button>
            </form>
          </Form>

          <p className="mt-8 text-center text-sm text-gray-300">
            By continuing, you agree to our{" "}
            <a href="#" className="text-pink-400 hover:text-pink-300">
              Terms of Service
            </a>{" "}
            &{" "}
            <a href="#" className="text-pink-400 hover:text-pink-300">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;