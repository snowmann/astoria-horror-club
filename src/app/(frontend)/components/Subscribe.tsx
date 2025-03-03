'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'

export default function Subscribe() {
  const formSchema = z.object({
    firstName: z.string().min(2, {
      message: 'Required',
    }),
    lastName: z.string().min(2, {
      message: 'Required',
    }),
    email: z.string().email({
      message: 'Invalid email address.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Handle form submission
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field: formField }) => (
              <FormItem className="pb-8">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...formField} />
                </FormControl>
                <div className="relative">
                  <FormMessage className="absolute -top-6 left-0 w-full" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field: formField }) => (
              <FormItem className="pb-8">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...formField} />
                </FormControl>
                <div className="relative">
                  <FormMessage className="absolute -top-6 left-0 w-full" />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1">
          <FormField
            control={form.control}
            name="email"
            render={({ field: formField }) => (
              <FormItem className="pb-8">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...formField} />
                </FormControl>
                <div className="relative">
                  <FormMessage className="absolute -top-6 left-0 w-full" />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
