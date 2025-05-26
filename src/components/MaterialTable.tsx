/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/MaterialTable.tsx
'use client'

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'

interface MaterialTableProps {
  data: Record<string, any>[]
  className?: string
}

/**
 * Automatically renders a shadcn/ui table from an array of objects.
 */
export function MaterialTable({ data, className }: MaterialTableProps) {
  if (!data || data.length === 0) return <p>No data available.</p>

  const headers = Object.keys(data[0])

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {headers.map((key) => (
            <TableHead key={key} className="capitalize">
              {key.replace(/_/g, ' ')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            {headers.map((key) => (
              <TableCell key={key}>{row[key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
