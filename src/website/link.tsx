// From https://github.com/mui-org/material-ui/tree/master/examples/nextjs
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import MuiLink from "@material-ui/core/Link";
import type { LinkProps as MuiLinkProps } from "@material-ui/core/Link";

type NextComposedProps = {
  as: string;
  className?: string;
  href: string;
  onClick?: React.EventHandler<React.SyntheticEvent>;
  prefetch?: boolean;
  children: React.ReactNode;
};

const NextComposed = React.forwardRef<any, NextComposedProps>(
  function NextComposed(props, ref) {
    const { as, href, prefetch, ...other } = props;

    return (
      <NextLink href={href} prefetch={prefetch} as={as}>
        <a ref={ref} {...other} />
      </NextLink>
    );
  }
);

type LinkProps = {
  activeClassName?: string;
  as: string;
  className?: string;
  href: string;
  innerRef?: React.Ref<any>;
  naked?: boolean;
  onClick?: React.EventHandler<React.SyntheticEvent>;
  prefetch?: boolean;
  children: React.ReactNode;
} & MuiLinkProps;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props: LinkProps) {
  const {
    href,
    activeClassName = "active",
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props;

  const router = useRouter();
  const pathname = href;

  const className =
    router.pathname === pathname && activeClassName
      ? `${classNameProps} ${activeClassName}`
      : classNameProps;

  if (naked) {
    return (
      <NextComposed
        className={className}
        ref={innerRef}
        href={href}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href}
      {...other}
    />
  );
}

export default React.forwardRef<any, LinkProps>((props, ref) => (
  <Link {...props} innerRef={ref} />
));
