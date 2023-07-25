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
import { Agent, agentSchema } from "@/data/schema"

interface AgentFormProps {
    onSuccess?: () => void
    agent?: Agent
}

export default function AgentForm({ onSuccess, agent }: AgentFormProps) {
    const queryClient = useQueryClient()
    let toastAddId: string

    const defaultAgent: Agent = {
        name: "",
        email: "",
        number: "",
        title: ""
    }

    const form = useForm<z.infer<typeof agentSchema>>({
        resolver: zodResolver(agentSchema),
        defaultValues: agent ? { ...agent } : defaultAgent
    })

    const { mutate, isLoading } = useMutation(
        async (agent: Agent) => await axios.post('/api/agents', agent),
        {
            onError: (error) => {
                if(error instanceof AxiosError) {
                    toast.error(error?.response?.data.errors[0].message, {id: toastAddId})
                }
            },
            onSuccess: (data) => {
                toast.success("Added successfully 👏", { id: toastAddId })
                queryClient.invalidateQueries(["agents"])
                if(onSuccess) onSuccess()
            }
        }
    )

    function onSubmit(values: Agent) {
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
                                        <Input placeholder="Porgas D. Ace" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="newgate@pegas.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="quick@att.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a title" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem key="directeur" value="director">Level 2</SelectItem>
                                            <SelectItem key="normal" value="normal">Level 1</SelectItem>
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