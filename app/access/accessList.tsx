"use client"

import { useQuery } from "react-query";
import axios from "axios";
import { accessSchema } from "@/data/schema";
import { z } from "zod";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Loading from "@/components/loading";
import { useAccessDate } from "@/store/useAccessDate";


export default function AccessList() {
    const { date } = useAccessDate()
    const { data: response, error, isLoading } = useQuery({
        queryFn: async () => {
           const response = await axios.get(`/api/accesses?date=${date}`)
           return response.data
        },
        queryKey: ["accesses", date]
    })

    if(error) return <>Error</>

    if(isLoading) return <Loading />
    
    const accesses = z.array(accessSchema).parse(response.data)
    
    return (
        <DataTable data={accesses} columns={columns} />
    )
}