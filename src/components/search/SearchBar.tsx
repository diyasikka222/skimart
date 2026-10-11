import { Search, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
  initialValue?: string
  autoFocus?: boolean
  placeholder?: string
  variant?: 'header' | 'page'
}

export function SearchBar({
  initialValue = '',
  autoFocus = false,
  placeholder = 'Search for groceries, brands and more',
  variant = 'header',
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue)
  const navigate = useNavigate()

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const q = value.trim()
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  if (variant === 'page') {
    return (
      <form
        role="search"
        onSubmit={submit}
        className="flex items-center gap-2 rounded-control border border-line bg-white p-1 shadow-sm transition-all duration-standard ease-standard focus-within:border-brand-green focus-within:ring-4 focus-within:ring-brand-green/10"
      >
        <label htmlFor="search-page" className="sr-only">
          Search the SKIMART catalogue
        </label>
        <Search aria-hidden className="ml-2.5 h-5 w-5 shrink-0 text-ink-muted" />
        <input
          id="search-page"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus={autoFocus}
          className="h-11 w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-muted focus-visible:outline-none"
          placeholder={placeholder}
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue('')}
            aria-label="Clear search"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-control text-ink-muted transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
          >
            <X aria-hidden className="h-4 w-4" />
          </button>
        )}
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-control bg-brand-orange px-4 text-sm font-semibold text-white transition-colors duration-standard hover:bg-brand-orange-deep focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
        >
          Search
        </button>
      </form>
    )
  }

  return (
    <form
      role="search"
      onSubmit={submit}
      className="flex w-full items-center rounded-control border border-line bg-surface-subtle transition-all duration-standard ease-standard focus-within:border-brand-green focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-green/10"
    >
      <label htmlFor="search-header" className="sr-only">
        Search the SKIMART catalogue
      </label>
      <Search aria-hidden className="ml-3 h-4 w-4 shrink-0 text-ink-muted" />
      <input
        id="search-header"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus={autoFocus}
        className="h-11 w-full bg-transparent px-2.5 text-sm text-ink outline-none placeholder:text-ink-muted focus-visible:outline-none"
        placeholder={placeholder}
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue('')}
          aria-label="Clear search"
          className="mr-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-control text-ink-muted transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange"
        >
          <X aria-hidden className="h-4 w-4" />
        </button>
      )}
    </form>
  )
}