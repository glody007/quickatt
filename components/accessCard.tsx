import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "./ui/textarea"

export function AccessCard() {
  return (
    <Tabs defaultValue="agent" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="agent">Agent</TabsTrigger>
        <TabsTrigger value="visitor">Visitor</TabsTrigger>
      </TabsList>
      <TabsContent value="agent">
        <Card>
          <CardHeader>
            <CardTitle>Agent</CardTitle>
            <CardDescription>
              Enter your agent pin. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="pin">Pin agent</Label>
              <Input id="pin" type="password" defaultValue="Pedro Duarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-green-600 hover:bg-green-400">Save</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="visitor">
        <Card>
          <CardHeader>
            <CardTitle>Visitor</CardTitle>
            <CardDescription>
              Enter your informations here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="fullname">Full name</Label>
              <Input id="fullname"  />
            </div>
            <div className="space-y-1">
              <Label htmlFor="number">Phone number</Label>
              <Input id="number" type="number" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="motif">Motif</Label>
              <Textarea id="motif" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-green-600 hover:bg-green-400">Save</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}