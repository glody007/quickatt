import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import * as z from "zod"
import { useMutation, useQueryClient } from "react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { Holiday, holidaySchema } from "@/data/schema"
import { DatePicker } from "../ui/datePicker"

interface HolidayFormProps {
    onSuccess?: () => void
    holiday?: Holiday
}

export default function HolidayForm({ onSuccess, holiday }: HolidayFormProps) {
    const queryClient = useQueryClient()
    let toastAddId: string

    const defaultHoliday: Holiday = {
        name: "",
        date: new Date(),
        image: ""
    }

    const form = useForm<z.infer<typeof holidaySchema>>({
        resolver: zodResolver(holidaySchema),
        defaultValues: holiday ? { ...holiday } : defaultHoliday
    })

    const { mutate, isLoading } = useMutation(
        async (holiday: Holiday) => await axios.post('/api/holidays', holiday),
        {
            onError: (error) => {
                if(error instanceof AxiosError) {
                    toast.error(error?.response?.data.errors[0].message, {id: toastAddId})
                }
            },
            onSuccess: (data) => {
                toast.success("Created successfully 👏", { id: toastAddId })
                queryClient.invalidateQueries(["holidays"])
                if(onSuccess) onSuccess()
            }
        }
    )

    function onSubmit(values: Holiday) {
        mutate(values)
    }

    return (
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Noel" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <DatePicker 
                                            showYear={false} 
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            className="w-full h-10 px-2" 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                    </div>
                    <Button isLoading={isLoading}  type="submit" className="mt-8">Confirmer</Button>
                </form>
            </Form>
    )
}