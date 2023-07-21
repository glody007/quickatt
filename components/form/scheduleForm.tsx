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
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import * as z from "zod"
import { useState } from "react"
import { Schedule, scheduleSchema } from "@/data/schema"

interface ScheduleFormProps {
    handleSuccess?: () => void
    schedule?: Schedule
}

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const activities = ["work", "holiday", "break"]

export default function ScheduleForm({ handleSuccess, schedule }: ScheduleFormProps) {
    const [isDisabled, setIsDisabled] = useState(false)
    let toastAddId: string

    const defaultAgent: Schedule = {
        day: "",
        activity: "work",
        startTime: "8:00 AM",
        endTime: "5:00 PM"
    }

    const form = useForm<z.infer<typeof scheduleSchema>>({
        resolver: zodResolver(scheduleSchema),
        defaultValues: schedule ? { ...schedule } : defaultAgent
    })

    function onSubmit(values: Schedule) {
        
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
                                                <SelectItem key={day} value={day}>
                                                    {day.toUpperCase()}
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
                                        <Input placeholder="8:00 AM" {...field} />
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
                                        <Input placeholder="5:00 PM" {...field} />
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
                    <Button disabled={isDisabled}  type="submit" className="mt-8">Confirmer</Button>
                </form>
            </Form>
    )
}