import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import React from "react";


export default function AccordionAccount() {

  const [gender, setGender] = React.useState("male");

  const {  logout } = useAuth();

  return (
    <Card className="w-screen h-screen">
      <CardHeader>
        <CardTitle>Your account</CardTitle>
        <CardDescription>Your informations all at the same place</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-8">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mail">Mail</Label>
              <Input id="mail" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="anniversary">Anniversary</Label>
              <Input type="date" id="anniversary" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Change password</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Changing password</DrawerTitle>
                <DrawerDescription>Set your new password.</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="npass">New Password</Label>
                    <Input type="password" id="npass" />
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="cpass">Confirm password</Label>
                    <Input type="password" id="cpass" />
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
        <Button onClick={logout}>Logout</Button>
      </CardFooter>
    </Card>
  );
}
