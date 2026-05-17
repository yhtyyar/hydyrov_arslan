import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock next/image for static export compatibility
vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, ...props }: any) => {
    return <a {...props}>{children}</a>
  },
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    pathname: '/',
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))
