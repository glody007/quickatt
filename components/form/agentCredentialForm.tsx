"use client"

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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import * as z from "zod"
import { useMutation, useQueryClient } from "react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { AgentCredential, agentCredentialSchema } from "@/data/schema"

interface AgentCredentialFormProps {
    onSuccess?: () => void
    credential?: AgentCredential
}

export default function AgentCredentialForm({ onSuccess, credential }: AgentCredentialFormProps) {
    const queryClient = useQueryClient()
    let toastAddId: string

    const defaultAgentCredential: AgentCredential = {
        pin: "",
    }

    const form = useForm<z.infer<typeof agentCredentialSchema>>({
        resolver: zodResolver(agentCredentialSchema),
        defaultValues: credential ? { ...credential } : defaultAgentCredential
    })

    const { mutate, isLoading } = useMutation(
        async (credential: AgentCredential) => await axios.post('/api/accesses', credential),
        {
            onError: (error) => {
                if(error instanceof AxiosError) {
                    toast.error(error?.response?.data.errors[0].message, {id: toastAddId})
                }
            },
            onSuccess: (response) => {
                toast.success(`${response.data.message} 👏`, { id: toastAddId })
                queryClient.invalidateQueries(["accesses"])
                form.reset()
                if(onSuccess) onSuccess()
            }
        }
    )

    function onSubmit(values: AgentCredential) {
        mutate(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pin agent</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
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