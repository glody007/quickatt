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
import { cn, convertTimeStringToMinute, getTimeZone } from "@/lib/utils"
import { format } from "date-fns"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import * as z from "zod"
import { useMutation, useQueryClient } from "react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { Schedule, scheduleSchema } from "@/data/schema"

interface ScheduleFormProps {
    onSuccess?: () => void
    schedule?: Schedule
}

const days = [
    {
        label: "monday",
        value: "Mon"
    },
    {
        label: "tuesday",
        value: "Tue"
    },
    {
        label: "wednesday",
        value: "Wed"
    },
    {
        label: "thursday",
        value: "Thu"
    },
    {
        label: "friday",
        value: "Fri"
    },
    {
        label: "saturday",
        value: "Sat"
    },
    {
        label: "sunday",
        value: "Sun"
    },
]

const activities = ["work", "holiday", "break"]

export default function ScheduleForm({ onSuccess, schedule }: ScheduleFormProps) {
    const queryClient = useQueryClient()
    let toastAddId: string

    const defaultAgent: Schedule = {
        day: "Mon",
        activity: "work",
        startTime: "08:00",
        endTime: "12:00",
        timeZone: getTimeZone()
    }

    const form = useForm<z.infer<typeof scheduleSchema>>({
        resolver: zodResolver(scheduleSchema),
        defaultValues: schedule ? { ...schedule } : defaultAgent
    })

    const { mutate, isLoading } = useMutation(
        async (schedule: Schedule) => await axios.post('/api/schedules', schedule),
        {
            onError: (error) => {
                if(error instanceof AxiosError) {
                    toast.error(error?.response?.data.errors[0].message, {id: toastAddId})
                }
            },
            onSuccess: (data) => {
                toast.success("Created successfully 👏", { id: toastAddId })
                queryClient.invalidateQueries(["schedules"])
                if(onSuccess) onSuccess()
            }
        }
    )

    function onSubmit(values: Schedule) {
        mutate(values)
    }

    return (
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="day"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Day</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a activity" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {days.map(day => (
                                                <SelectItem key={day.value} value={day.value}>
                                                    {day.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="startTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="endTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="activity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Activity</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an activity" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {activities.map(activity => (
                                                <SelectItem key={activity} value={activity}>
                                                    {activity}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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