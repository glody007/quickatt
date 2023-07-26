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
import { Visit, visitSchema } from "@/data/schema"
import { Textarea } from "../ui/textarea"

interface VisitFormProps {
    onSuccess?: () => void
    visit?: Visit
}

export default function VisitForm({ onSuccess, visit }: VisitFormProps) {
    const queryClient = useQueryClient()
    let toastAddId: string

    const defaultVisit: Visit = {
        name: "",
        email: "",
        number: "",
        motif: ""
    }

    const form = useForm<z.infer<typeof visitSchema>>({
        resolver: zodResolver(visitSchema),
        defaultValues: visit ? { ...visit } : defaultVisit
    })

    const { mutate, isLoading } = useMutation(
        async (visit: Visit) => await axios.post('/api/visites', visit),
        {
            onError: (error) => {
                if(error instanceof AxiosError) {
                    toast.error(error?.response?.data.errors[0].message, {id: toastAddId})
                }
            },
            onSuccess: (data) => {
                toast.success("Added successfully 👏", { id: toastAddId })
                queryClient.invalidateQueries(["visites"])
                form.reset()
                if(onSuccess) onSuccess()
            }
        }
    )

    function onSubmit(values: Visit) {
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
                                <FormLabel>Full name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Porgas D. Ace" {...field} />
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
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                    <Input placeholder="0850000000" id="number" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="motif"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Motif</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Rendez-vous" id="motif" {...field} />
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