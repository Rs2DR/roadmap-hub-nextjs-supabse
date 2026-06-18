import { Bookmark, Heart, MessageSquare } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

export function PublicRoadmapCard() {
  return (
    <Card className="flex w-full">
      <CardHeader className="flex flex-col grow">
        <div className="inline-flex justify-between w-full">
          <div className="inline-flex items-center gap-4">
            <Avatar>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardTitle>Основы веб-разработки</CardTitle>
          </div>
          <CardAction>
            <Button variant="outline" size="icon">
              <Bookmark />
            </Button>
          </CardAction>
        </div>
        <CardDescription className="mt-2 line-clamp-3 mb-2">
          Создайте атмосферу тепла и уюта в вашем доме с этим [название товара].
          Он идеально подходит для [основное применение, например, вечерних
          посиделок, создания настроения] и станет прекрасным дополнением к
          вашему интерьеру. Больше: https://sinonim.org/gen#res
        </CardDescription>
      </CardHeader>
      <CardFooter className="inline-flex items-center justify-between py-2">
        <div className="inline-flex gap-2 text-muted-foreground">
          <div className="inline-flex items-center gap-1.5">
            <MessageSquare size={18} />
            <span>0</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Heart className="text-red-500" size={18} />
            <span>0</span>
          </div>
        </div>
        <div className="inline-flex items-center gap-4">
          <Button asChild>
            <Link href={`dashboard/view/${1}`}>Просмотреть</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
