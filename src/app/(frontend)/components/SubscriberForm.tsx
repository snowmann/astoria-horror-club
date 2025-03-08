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
import Alert, { type Props as AlertProps } from './Alert'
import { useState } from 'react'
import { CreateContactResponseSuccess, ErrorResponse } from 'resend'

type CreateContactResponse = {
  data: CreateContactResponseSuccess | null
  error: ErrorResponse | null
  success: boolean
}

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

export default function SubscriberForm() {
  const [alertData, setAlertData] = useState<AlertProps | null>(null)
  const [success, setSuccess] = useState<true | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  })

  const onSubscriberSubmit = async (formValues: z.infer<typeof formSchema>) => {
    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    })

    const { success, error }: CreateContactResponse = await response.json()

    if (success) {
      setAlertData({
        title: 'Success',
        description: 'You have been subscribed to our newletter',
        variant: 'success',
      })
      setSuccess(true)
    } else {
      setAlertData({
        title: 'Error',
        description: error?.message ?? 'We were unable to subscribe you. Please try again',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      {alertData && <Alert {...alertData} styles="mb-16" />}
      {success !== true && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((formValues) => onSubscriberSubmit(formValues))}
            className="space-y-4"
          >
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
      )}
    </>
  )
}
