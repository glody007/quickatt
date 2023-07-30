"use client"

import { useQuery } from "react-query";
import axios from "axios";
import { visitSchema } from "@/data/schema";
import { z } from "zod";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Loading from "@/components/loading";
import { useVisitDate } from "@/store/useVisitDate";


export default function VisitList() {
    const { date } = useVisitDate()
    const { data: response, error, isLoading } = useQuery({
        queryFn: async () => {
           const response = await axios.get(`/api/visites?date=${date}`)
           return response.data
        },
        queryKey: ["visites", date]
    })

    if(error) return <>Error</>

    if(isLoading) return <Loading />
    
    const visites = z.array(visitSchema).parse(response.data)

    return (
        <DataTable data={visites} columns={columns} />
    )
}