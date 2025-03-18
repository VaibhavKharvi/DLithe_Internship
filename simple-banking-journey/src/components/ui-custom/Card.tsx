
import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  clickable?: boolean;
  hover?: boolean;
  children: React.ReactNode;
}

export const Card = ({ 
  className, 
  clickable = false, 
  hover = true,
  children, 
  ...props 
}: CardProps) => {
  // Ensure onClick is properly handled and applied to the div element
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl bg-card border border-border shadow-soft p-6 transition-all duration-250",
        hover && "hover:shadow-medium hover:translate-y-[-2px]",
        (clickable || props.onClick) && "cursor-pointer active:translate-y-[1px] active:shadow-soft",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      className={cn("text-xl font-semibold tracking-tight mb-2", className)}
      {...props}
    />
  );
};

export const CardDescription = ({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
};

export const CardContent = ({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("pt-4", className)}
      {...props}
    />
  );
};

export const CardHeader = ({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("pb-2 space-y-1", className)}
      {...props}
    />
  );
};

export const CardFooter = ({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("pt-4 flex items-center", className)}
      {...props}
    />
  );
};
