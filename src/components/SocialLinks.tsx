// components/SocialLinks.tsx
import { JSX } from 'react'
import {
    FaTwitter,
    FaFacebook,
    FaLinkedin,
    FaInstagram,
    FaYoutube,
  } from 'react-icons/fa'
  
  type Platform = 'twitter' | 'facebook' | 'linkedin' | 'instagram' | 'youtube'
  
  interface SocialLink {
    platform: Platform
    url: string
  }
  
  interface Props {
    links: SocialLink[]
    size?: number
    className?: string
  }
  
  const iconMap: Record<Platform, JSX.Element> = {
    twitter: <FaTwitter />,
    facebook: <FaFacebook />,
    linkedin: <FaLinkedin />,
    instagram: <FaInstagram />,
    youtube: <FaYoutube />,
  }
  
  export default function SocialLinks({ links, size = 24, className = '' }: Props) {
    return (
      <div className={`flex gap-4 items-center ${className}`}>
        {links.map(({ platform, url }) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform}
            className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
            style={{ fontSize: size }}
          >
            {iconMap[platform]}
          </a>
        ))}
      </div>
    )
  }
  