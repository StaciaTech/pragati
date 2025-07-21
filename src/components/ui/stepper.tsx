
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

interface StepperContextValue extends StepperProps {
  clickable?: boolean
  isError?: boolean
  isLoading?: boolean
  isVertical: boolean
  stepCount: number
  expandVerticalSteps: boolean
  activeStep: number
  setActiveStep: (step: number) => void
}

const StepperContext = React.createContext<StepperContextValue | null>(null)

function useStepper() {
  const context = React.useContext(StepperContext)
  if (!context) {
    throw new Error("useStepper must be used within a <Stepper />")
  }
  return context
}

const stepperVariants = cva(
  "flex w-full flex-wrap justify-between gap-2",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

interface StepperProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stepperVariants> {
  initialStep?: number
  children: React.ReactNode
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      children,
      orientation = "horizontal",
      initialStep = 0,
      ...props
    },
    ref
  ) => {
    const isVertical = orientation === "vertical"
    const [activeStep, setActiveStep] = React.useState(initialStep)

    const stepCount = React.Children.toArray(children).length

    const contextValue: StepperContextValue = {
      isVertical,
      activeStep,
      setActiveStep,
      stepCount,
      ...props,
    }

    return (
      <StepperContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(stepperVariants({ orientation }), className)}
          {...props}
        >
          {children}
        </div>
      </StepperContext.Provider>
    )
  }
)
Stepper.displayName = "Stepper"


const StepperItem = React.forwardRef<HTMLDivElement, { children: React.ReactNode; index?: number }>(
  ({ children, index }, ref) => {
    const { activeStep, isVertical } = useStepper()
    const isCompleted = index !== undefined && index < activeStep
    const isActive = index === activeStep

    return (
      <div
        ref={ref}
        className={cn(
          "flex-1 flex flex-col gap-2",
          isVertical ? "items-start" : "items-center"
        )}
        data-active={isActive}
        data-completed={isCompleted}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, {
                index,
                isCompleted,
                isActive,
              })
            : child
        )}
      </div>
    )
  }
)
StepperItem.displayName = "StepperItem"


const StepperTrigger = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; index?: number; isCompleted?: boolean; isActive?: boolean }
>(({ children, index, isCompleted, isActive }, ref) => {
  const { setActiveStep, isVertical } = useStepper()

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-4 cursor-pointer",
        isVertical ? "w-full" : ""
      )}
      onClick={() => index !== undefined && setActiveStep(index)}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2",
          isActive && "border-primary",
          isCompleted && "bg-primary border-primary text-primary-foreground"
        )}
      >
        {isCompleted ? (
          <Check className="w-5 h-5" />
        ) : (
          <span className={cn(isActive && "text-primary")}>{index !== undefined && index + 1}</span>
        )}
      </div>
      <div className={cn(isVertical ? "flex flex-col" : "hidden md:block")}>
        {children}
      </div>
    </div>
  )
})
StepperTrigger.displayName = "StepperTrigger"

const StepperContent = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; index?: number; isActive?: boolean }
>(({ children, index, isActive }, ref) => {
  const { isVertical } = useStepper()
  if (!isActive) return null

  return (
    <div
      ref={ref}
      className={cn(
        "w-full p-4 border-l-2 ml-4",
        isVertical ? "mt-2" : "mt-4 md:ml-0 md:pl-0 md:border-l-0 md:border-t-2"
      )}
    >
      {children}
    </div>
  )
})
StepperContent.displayName = "StepperContent"

const StepperNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ ...props }, ref) => {
  const { activeStep, setActiveStep, stepCount } = useStepper()
  const isLastStep = activeStep === stepCount - 1

  if (isLastStep) return null

  return (
    <Button
      ref={ref}
      onClick={() => setActiveStep(activeStep + 1)}
      {...props}
    >
      Next
    </Button>
  )
})
StepperNext.displayName = "StepperNext"


const StepperPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ ...props }, ref) => {
  const { activeStep, setActiveStep } = useStepper()
  const isFirstStep = activeStep === 0

  if (isFirstStep) return null

  return (
    <Button
      ref={ref}
      variant="outline"
      onClick={() => setActiveStep(activeStep - 1)}
      {...props}
    >
      Previous
    </Button>
  )
})
StepperPrevious.displayName = "StepperPrevious"

export {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperContent,
  StepperNext,
  StepperPrevious,
  useStepper,
}
