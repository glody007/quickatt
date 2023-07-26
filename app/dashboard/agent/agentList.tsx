"use client"

import { useQuery } from "react-query";
import axios from "axios";
import { agentSchema} from "@/data/schema";
import { z } from "zod";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Loading from "@/components/loading";


export default function AgentList() {

    const { data: response, error, isLoading } = useQuery({
        queryFn: async () => {
           const response = await axios.get("/api/agents")
           return response.data
        },
        queryKey: ["agents"]
    })

    if(error) return <>Error</>

    if(isLoading) return <Loading />

    const agents = z.array(agentSchema).parse(response.data)

    return (
        <DataTable data={agents} columns={columns} />
    )
}