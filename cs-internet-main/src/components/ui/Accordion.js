"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("tw-border-b tw-mb-3", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="tw-flex tw-mb-0 ">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "tw-flex tw-flex-1 tw-items-center tw-justify-between tw-py-4 tw-text-sm tw-font-medium tw-transition-all tw-hover:underline tw-text-left tw-[&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="tw-h-4 tw-w-4 tw-shrink-0 tw-text-muted-foreground tw-transition-transform tw-duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="tw-overflow-hidden tw-text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("tw-pb-4 tw-pt-0 tw-mb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
