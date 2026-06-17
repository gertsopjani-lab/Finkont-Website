import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // `group/btn` + relative/overflow enable the sweeping sheen (::after) overlay.
  "group/btn relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 ease-out will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 after:pointer-events-none after:absolute after:inset-y-0 after:-z-0 after:w-1/3 after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:opacity-0 after:[transform:translateX(-150%)_skewX(-12deg)] hover:after:opacity-100 hover:after:[animation:shine_0.9s_ease-out]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-primary-glow hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[linear-gradient(110deg,#b98bea,#ae7be5_50%,#9d63e0)] hover:shadow-primary-glow-lg active:translate-y-0 active:scale-[0.97]",
        accent:
          "bg-accent-neutral text-accent-neutral-foreground hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_0_28px_4px_rgba(174,123,229,0.5)] active:translate-y-0 active:scale-[0.97]",
        outline:
          "border border-white/10 bg-white/[0.03] text-accent-neutral backdrop-blur-md hover:border-primary/60 hover:bg-white/[0.06]",
        ghost: "text-accent-neutral hover:bg-white/[0.06]",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
