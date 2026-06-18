import { Avatar, AvatarFallback } from '../ui/Avatar';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/Card';

import { MyRoadmapCardDropdownMenu } from './MyRoadmapCardDropdownMenu';
import { MyRoadmapCardFooter } from './MyRoadmapCardFooter';

import type { Roadmap } from '@/shcemas/RoadmapSchema';

interface MyRoadmapCardProps {
  roadmap: Roadmap;
}

export function MyRoadmapCard({ roadmap }: MyRoadmapCardProps) {
  const { title, description } = roadmap;

  return (
    <Card className="flex w-full">
      <CardHeader className="flex flex-col grow">
        <div className="inline-flex justify-between w-full">
          <div className="inline-flex items-center gap-4">
            <Avatar>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardTitle>{title}</CardTitle>
          </div>
          <CardAction>
            <MyRoadmapCardDropdownMenu roadmap={roadmap} />
          </CardAction>
        </div>
        <CardDescription className="mt-2 line-clamp-3 ">
          {description}
        </CardDescription>
      </CardHeader>
      <MyRoadmapCardFooter roadmap={roadmap} />
    </Card>
  );
}
