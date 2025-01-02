import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { MobileForm } from "@/components/auth/MobileForm"
import { OTPForm } from "@/components/auth/OTPForm"
import { z } from "zod"
import { mobileFormSchema } from "@/components/auth/MobileForm"
import { otpFormSchema } from "@/components/auth/OTPForm"

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [mobileNumber, setMobileNumber] = useState("")
  const [userRole, setUserRole] = useState<"user" | "delivery">("user")
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    const role = localStorage.getItem("userRole")
    if (isAuthenticated) {
      if (role === "delivery") {
        navigate("/delivery")
      } else {
        navigate("/")
      }
    }
  }, [navigate])

  const onMobileSubmit = async (values: z.infer<typeof mobileFormSchema>) => {
    setIsLoading(true)
    try {
      console.log("Mobile submitted:", values.mobile)
      if (values.mobile === "7289993664") {
        setUserRole("user")
        setMobileNumber(values.mobile)
        setShowOTP(true)
        toast({
          title: "Success",
          description: "OTP sent successfully",
        })
      } else if (values.mobile === "9900990099") {
        setUserRole("delivery")
        setMobileNumber(values.mobile)
        setShowOTP(true)
        toast({
          title: "Success",
          description: "OTP sent successfully",
        })
      } else {
        console.log("Invalid mobile number")
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid mobile number",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const onOTPSubmit = async (values: z.infer<typeof otpFormSchema>) => {
    setIsLoading(true)
    try {
      console.log("OTP submitted:", values.otp)
      if (values.otp === "123456") {
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("userRole", userRole)
        
        if (userRole === "delivery") {
          navigate("/delivery", { replace: true })
        } else {
          navigate("/", { replace: true })
        }
        
        setTimeout(() => {
          toast({
            title: "Success",
            description: "Logged in successfully",
          })
        }, 100)
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid OTP",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-transparent py-8 px-4 sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
            <h1 className="text-4xl font-bold text-primary-200 text-center mb-2">
              quickyy
            </h1>
            <h2 className="text-3xl font-bold text-white text-center mb-1">
              {userRole === "delivery" ? "Partner Login" : "Customer Login"}
            </h2>
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              {userRole === "delivery" ? "Deliver with us" : "delivered in 90 minutes"}
            </h3>
          </div>

          {!showOTP ? (
            <MobileForm onSubmit={onMobileSubmit} isLoading={isLoading} />
          ) : (
            <OTPForm
              onSubmit={onOTPSubmit}
              onBack={() => setShowOTP(false)}
              isLoading={isLoading}
              mobileNumber={mobileNumber}
            />
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
  )
}