"use client"
import React from 'react'
import { columns } from './column'
import { DataTable } from '../ui/data-table'
import { EditorCreatePermission } from './edit-or-create-permission'
import { Permission } from '@/types'

export default function PermissionsTable({ data }: { data: Permission[] }) {
    return (
        <DataTable
            columns={columns}
            data={data}
            rightAction={<EditorCreatePermission

                mode='create'
            />}
        />
    )
}
