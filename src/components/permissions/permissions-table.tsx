"use client"
import React from 'react'
import { columns } from './column'
import { DataTable } from '../ui/data-table'
import { useQuery } from '@tanstack/react-query'
import { EditorCreatePermission } from './edit-or-create-permission'
import { Permission } from '@/types'

export default function PermissionsTable() {
    const { data, isLoading, error } = useQuery(
        {
            queryKey: ["permissions"],
            queryFn: async () => {
                const res = await fetch("/api/permissions")
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
            data={data as Permission[]}
            rightAction={<EditorCreatePermission

                mode='create'
            />}
        />
    )
}
