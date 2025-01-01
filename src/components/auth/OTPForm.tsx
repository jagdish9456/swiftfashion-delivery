import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export const otpFormSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
})

type OTPFormProps = {
  onSubmit: (values: z.infer<typeof otpFormSchema>) => void;
  onBack: () => void;
  isLoading: boolean;
  mobileNumber: string;
}

export const OTPForm = ({ onSubmit, onBack, isLoading, mobileNumber }: OTPFormProps) => {
  const form = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
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
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
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
            onClick={onBack}
            disabled={isLoading}
          >
            Change Phone Number
          </Button>
        </div>
      </form>
    </Form>
  )
}