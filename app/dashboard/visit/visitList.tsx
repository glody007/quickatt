"use client"

import { useQuery } from "react-query";
import axios from "axios";
import { visitSchema } from "@/data/schema";
import { z } from "zod";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Loading from "@/components/loading";


export default function VisitList() {

    const { data: response, error, isLoading } = useQuery({
        queryFn: async () => {
           const response = await axios.get("/api/visites")
           return response.data
        },
        queryKey: ["visites"]
    })

    if(error) return <>Error</>

    if(isLoading) return <Loading />
    
    const visites = z.array(visitSchema).parse(response.data)

    return (
        <DataTable data={visites} columns={columns} />
    )
}