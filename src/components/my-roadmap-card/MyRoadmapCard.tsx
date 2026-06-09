import {
  Heart,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Share,
  Trash,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '../ui/Avatar';
import { Button } from '../ui/Button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/Card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { Separator } from '../ui/Separator';

export function MyRoadmapCard() {
  return (
    <Card className="relative mx-auto w-full">
      <CardHeader>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Инструменты</DropdownMenuLabel>
                <DropdownMenuItem className="text-accent-foreground">
                  <Pencil /> Изменить
                </DropdownMenuItem>
                <DropdownMenuItem className="text-accent-foreground">
                  <Trash /> Удалить
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <Separator />
              <DropdownMenuGroup>
                <DropdownMenuLabel>Основное</DropdownMenuLabel>
                <DropdownMenuItem className="text-accent-foreground">
                  <Share /> Поделиться
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
        <div className="inline-flex items-center gap-4">
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardTitle>Design systems meetup</CardTitle>
        </div>
        <CardDescription className="mt-2">
          A practical talk on component APIs, accessibility, and shipping
          faster.
        </CardDescription>
      </CardHeader>
      <CardFooter className="py-2">
        <div className="inline-flex gap-2 text-muted-foreground">
          <div className="inline-flex items-center gap-1.5">
            <MessageSquare size={18} />
            <span className="trext-lg">0</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Heart size={18} />
            <span className="trext-lg">0</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
