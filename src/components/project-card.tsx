import Image from "next/image";
import Link from "next/link";
import { FilledTonalButton, TextButton } from "@/components/button/button";
import { Icon } from "@/components/icon/icon";
import { cva, type VariantProps } from "class-variance-authority";
import React, { Component } from "react";

export interface ProjectCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ProjectCardVariants> {
  title: string;
  description: string;
  coverImage: string;
  links: {
    playStore: string | undefined;
    sourceCode?: string;
    webApp?: string;
    learnMore: string;
  };
  reverseImage?: boolean;
}

const ProjectCardVariants = cva(
  "flex md:flex-row flex-col gap-8 mx-auto w-fit",
  {
    variants: {
      reverseImage: {
        true: "md:flex-row-reverse",
        false: "",
      },
    },
    defaultVariants: {
      reverseImage: false,
    },
  }
);

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ title, description, coverImage, links, reverseImage, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={ProjectCardVariants({ reverseImage })}
        {...props}
      >
        <Image
          src={coverImage}
          alt={`${title} Cover`}
          width={400}
          height={225}  
          className="rounded-2xl md:w-[400px] w-full aspect-video"
        />
        <div className="max-w-2xl flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-headline-large">{title}</h1>
            <p className="text-on-surface-variant text-body-large text-justify">
              {description}{" "}
              {links.learnMore && (
                <Link
                  href={links.learnMore}
                  className="text-primary hover:underline"
                >
                  Learn More
                </Link>
              )}
            </p>
          </div>
          <div className="my-4 gap-4 flex flex-row flex-wrap mx-1">
            {links.playStore && (
              <FilledTonalButton href={links.playStore}>
                <Icon slot="icon">shop</Icon>
                Get on Play Store
              </FilledTonalButton>
            )}
            {links.sourceCode && (
              <TextButton href={links.sourceCode}>
                <Icon slot="icon">code</Icon>
                Get Source Code
              </TextButton>
            )}
            {links.webApp && (
              <TextButton href={links.webApp}>
                <Icon slot="icon">language</Icon>
                Web App
              </TextButton>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export { ProjectCard, ProjectCardVariants };
