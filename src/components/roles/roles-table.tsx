"use client"
import React from 'react'
import { columns } from './column'
import { DataTable } from '../ui/data-table'
import { useQuery } from '@tanstack/react-query'
import { EditorCreateRole } from './edit-or-create-role'
import { Role } from '@/types'

export default function RolesTable() {
    const { data, isLoading, error } = useQuery(
        {
            queryKey: ["roles"],
            queryFn: async () => {
                const res = await fetch("/api/roles")
                if (!res.ok) return []
                return await res.json()
            }

        }
    )

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <DataTable
            columns={columns}
            data={data as Role[]}
            rightAction={<EditorCreateRole
                mode='create'
            />}
        />
    )
}
