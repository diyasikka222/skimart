import { useState, type ImgHTMLAttributes } from 'react'
import { assetUrls } from '@/data/assets'

interface SmartImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string
  alt: string
  fallbackSrc?: string
  lazy?: boolean
}

/**
 * Image wrapper with graceful fallback and reserved space to limit layout shift.
 * Swap `src` in the asset manifest to replace demo photography.
 */
export function SmartImage({
  src,
  alt,
  fallbackSrc = assetUrls.placeholderProduct,
  lazy = true,
  className,
  ...rest
}: SmartImageProps) {
  const [errored, setErrored] = useState(false)

  return (
    <img
      {...rest}
      src={errored ? fallbackSrc : src}
      alt={alt}
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
      className={className}
      onError={() => setErrored(true)}
    />
  )
}