import { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

const formSchema = z.object({
  mobile: z
    .string()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^\d+$/, "Must be only digits"),
});

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isAuthenticated = Cookies.get("isAuthenticated") === "true";
    console.log("Authentication check:", isAuthenticated);
    if (isAuthenticated) {
      console.log("User is authenticated, redirecting to home");
      navigate("/");
    }
  }, [navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      console.log("Form submitted with mobile:", values.mobile);
      if (values.mobile === "7289993664") {
        console.log("Valid mobile number, setting cookie and redirecting");
        // Set cookie with 30 minutes expiry (1/48 of a day)
        Cookies.set("isAuthenticated", "true", { expires: 1/48 });
        
        // First navigate
        navigate("/", { replace: true });
        
        // Then show toast
        setTimeout(() => {
          toast({
            title: "Success",
            description: "Logged in successfully",
          });
        }, 100);
        
        console.log("Navigation and toast triggered");
      } else {
        console.log("Invalid mobile number");
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
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-transparent py-8 px-4 sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
            <h1 className="text-4xl font-bold text-primary-200 text-center mb-2">
              quickyy
            </h1>
            <h2 className="text-3xl font-bold text-white text-center mb-1">
              Clothes
            </h2>
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              delivered in 90 minutes
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
                    <FormMessage className="text-primary-200" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-semibold py-3 rounded-full"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Send OTP"}
              </Button>
            </form>
          </Form>

          <p className="mt-8 text-center text-sm text-gray-300">
            By continuing, you agree to our{" "}
            <a href="#" className="text-primary-300 hover:text-primary-200">
              Terms of Service
            </a>{" "}
            &{" "}
            <a href="#" className="text-primary-300 hover:text-primary-200">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};