"use client"
import React from 'react'
import { columns } from './column'
import { DataTable } from '../ui/data-table'
import { EditorCreateRole } from './edit-or-create-role'
import { Role } from '@/types'

export default function RolesTable({data}: {data: Role[]}) {
    return (
        <DataTable
            columns={columns}
            data={data}
            rightAction={<EditorCreateRole
                mode='create'
            />}
        />
    )
}
