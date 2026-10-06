import * as React from "react";
import {
  Tabs as TabsPrimitive,
  TabsList as TabsListPrimitive,
  TabsTab as TabsTabPrimitive,
  TabsPanel as TabsPanelPrimitive,
  TabsPanels as TabsPanelsPrimitive,
  TabsHighlight,
  TabsHighlightItem,
  useTabs,
} from "@/components/animate-ui/primitives/base/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Tabs = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <TabsPrimitive
      ref={ref}
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
});
Tabs.displayName = "Tabs";

export const TabsList = React.forwardRef(
  ({ className = "", ...props }, ref) => {
    return (
      <TabsListPrimitive
        ref={ref}
        className={cn(
          "bg-transparent border-0 p-0 text-[#909092] inline-flex items-center justify-center gap-1",
          className
        )}
        {...props}
      />
    );
  }
);
TabsList.displayName = "TabsList";

export const TabsTab = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <TabsTabPrimitive
      ref={ref}
      className={cn(
        "focus-visible:ring-1 focus-visible:ring-[#909092] text-[#909092] inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-colors duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 select-none",
        className
      )}
      {...props}
    />
  );
});
TabsTab.displayName = "TabsTab";

export const TabsPanels = TabsPanelsPrimitive;
export const TabsPanel = TabsPanelPrimitive;

export { TabsHighlight, TabsHighlightItem, useTabs };

export function BaseTabsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTab value="account">Account</TabsTab>
          <TabsTab value="password">Password</TabsTab>
        </TabsList>
        <Card className="shadow-none py-0">
          <TabsPanels className="py-6">
            <TabsPanel value="account" className="flex flex-col gap-6">
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you&apos;re
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-name">Name</Label>
                  <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </TabsPanel>
            <TabsPanel value="password" className="flex flex-col gap-6">
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged
                  out.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-current">Current password</Label>
                  <Input id="tabs-demo-current" type="password" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-new">New password</Label>
                  <Input id="tabs-demo-new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </TabsPanel>
          </TabsPanels>
        </Card>
      </Tabs>
    </div>
  );
}

export default Tabs;
