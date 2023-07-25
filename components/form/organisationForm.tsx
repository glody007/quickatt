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
import { Organisation, organisationSchema } from "@/data/schema"

interface OrganisationFormProps {
    onSuccess?: () => void,
    organisation?: Organisation
}

const countries = [
    {
        code: "CD",
        name: "République démocratique du Congo"
    },
]

const cities = ["Lubumbashi", "Kolwezi", "Kinshasa", "autre"]

export default function OrganisationForm({ onSuccess, organisation }: OrganisationFormProps) {
    const queryClient = useQueryClient()
    let toastAddId: string

    const defaultOrganisation: Organisation = {
        name: "",
        city: "",
        country: "",
        address: ""
    }

    const form = useForm<z.infer<typeof organisationSchema>>({
        resolver: zodResolver(organisationSchema),
        defaultValues: organisation ? { ...organisation } : defaultOrganisation
    })

    const { mutate, isLoading } = useMutation(
        async (org: Organisation) => await axios.post('/api/organisations', org),
        {
            onError: (error) => {
                if(error instanceof AxiosError) {
                    toast.error(error?.response?.data.errors[0].message, {id: toastAddId})
                }
            },
            onSuccess: (data) => {
                toast.success("Created successfully 👏", { id: toastAddId })
                queryClient.invalidateQueries(["organisations"])
                if(onSuccess) onSuccess()
            }
        }
    )

    function onSubmit(values: Organisation) {
        mutate(values)
        console.log(values)
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
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {countries.map(country => (
                                            <SelectItem key={country.code} value={country.code}>
                                                {country.name}
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
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select city" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {cities.map(city => (
                                            <SelectItem key={city} value={city}>
                                                {city}
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
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Maniema 3366" {...field} />
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