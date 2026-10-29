import React, { type ReactNode, type ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'group relative inline-flex items-center justify-center overflow-hidden rounded-md font-display font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-red text-ui-white shadow-lg hover:shadow-brand-red/50 hover:-translate-y-0.5',
        secondary: 'bg-brand-black text-ui-white',
        // Theme-Tokens statt fester Markenfarben: `brand-black` (#1A1A1A) hat
        // keine Dark-Variante und lag im Dark Mode bei 1,14:1 Kontrast auf dem
        // dunklen Hintergrund. `foreground`/`background` drehen sich mit dem
        // Theme, der Hover bleibt die invertierte Fuellung wie zuvor. Der Rahmen
        // ist im Ruhezustand auf 40 % abgeschwaecht und wird erst beim Hover voll.
        outline:
          'border border-foreground/40 bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background',
      },
      size: {
        default: 'h-11 px-6 text-sm',
        sm: 'h-9 rounded-md px-3 text-sm',
        lg: 'h-12 rounded-md px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  children: ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center">{children}</span>
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export default Button
