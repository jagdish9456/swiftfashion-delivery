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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const mobileFormSchema = z.object({
  mobile: z
    .string()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^\d+$/, "Must be only digits"),
});

const otpFormSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    console.log("Authentication check:", isAuthenticated);
    if (isAuthenticated) {
      console.log("User is authenticated, redirecting to home");
      navigate("/");
    }
  }, [navigate]);

  const mobileForm = useForm<z.infer<typeof mobileFormSchema>>({
    resolver: zodResolver(mobileFormSchema),
    defaultValues: {
      mobile: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onMobileSubmit = async (values: z.infer<typeof mobileFormSchema>) => {
    setIsLoading(true);
    try {
      console.log("Mobile submitted:", values.mobile);
      if (values.mobile === "7289993664") {
        setMobileNumber(values.mobile);
        setShowOTP(true);
        toast({
          title: "Success",
          description: "OTP sent successfully",
        });
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

  const onOTPSubmit = async (values: z.infer<typeof otpFormSchema>) => {
    setIsLoading(true);
    try {
      console.log("OTP submitted:", values.otp);
      if (values.otp === "123456") {
        console.log("Valid OTP, setting localStorage and redirecting");
        localStorage.setItem("isAuthenticated", "true");
        
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
        console.log("Invalid OTP");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid OTP",
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

          {!showOTP ? (
            <Form {...mobileForm}>
              <form onSubmit={mobileForm.handleSubmit(onMobileSubmit)} className="space-y-6">
                <FormField
                  control={mobileForm.control}
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
          ) : (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-6">
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col items-center space-y-4">
                          <p className="text-white text-sm">
                            Enter OTP sent to +91 {mobileNumber}
                          </p>
                          <InputOTP
                            maxLength={6}
                            render={({ slots }) => (
                              <InputOTPGroup className="gap-2">
                                {slots.map((slot, idx) => (
                                  <InputOTPSlot
                                    key={idx}
                                    {...slot}
                                    index={idx}
                                    className="bg-white/90 border-0"
                                  />
                                ))}
                              </InputOTPGroup>
                            )}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-primary-200" />
                    </FormItem>
                  )}
                />

                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-semibold py-3 rounded-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Verify OTP"}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-primary-200 hover:text-primary-100"
                    onClick={() => setShowOTP(false)}
                    disabled={isLoading}
                  >
                    Change Phone Number
                  </Button>
                </div>
              </form>
            </Form>
          )}

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