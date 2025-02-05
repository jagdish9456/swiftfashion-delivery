import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

export const mobileFormSchema = z.object({
  mobile: z
    .string()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^\d+$/, "Must be only digits"),
})

type MobileFormProps = {
  onSubmit: (values: z.infer<typeof mobileFormSchema>) => void;
  isLoading: boolean;
}

export const MobileForm = ({ onSubmit, isLoading }: MobileFormProps) => {
  const form = useForm<z.infer<typeof mobileFormSchema>>({
    resolver: zodResolver(mobileFormSchema),
    defaultValues: {
      mobile: "",
    },
  })

  return (
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
  )
}
