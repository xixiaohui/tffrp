// src/components/ImageCard.tsx
'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ImageCardProps {
  src: string
  alt: string
  title?: string
  description?: string
  className?: string
}

export function ImageCard({
  src,
  alt,
  title,
  description,
  className,
}: ImageCardProps) {
  return (
    <Card className={cn('overflow-hidden shadow-xl rounded-2xl max-w-3xl mx-auto', className)}>
      <CardContent className="p-0">
        <Image
          src={src}
          alt={alt}
          width={500}
          height={500}
          className="object-cover w-full h-auto"
        />
        {(title || description) && (
          <div className="p-4 space-y-2">
            {title && <h3 className="text-xl font-semibold">{title}</h3>}
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
