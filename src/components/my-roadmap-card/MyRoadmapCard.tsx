import { Heart, MessageSquare, MoreHorizontal } from 'lucide-react';

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

export function MyRoadmapCard() {
  return (
    <Card className="relative mx-auto w-full max-w-sm ">
      <CardHeader>
        <CardAction>
          <Button variant="outline" size="icon">
            <MoreHorizontal />
          </Button>
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
