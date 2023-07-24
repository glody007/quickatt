"use client"

import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import OrganisationForm from "./form/organisationForm"
import { useRouter } from "next/navigation"

export function CreateOrganisationCard() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/dashboard')
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create organisation</CardTitle>
        <CardDescription>Fill your organisation's informations.</CardDescription>
      </CardHeader>
      <CardContent>
        <OrganisationForm onSuccess={handleSuccess} />
      </CardContent>
    </Card>
  )
}
