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
  const { id, title, description } = roadmap;

  return (
    <Card className="relative mx-auto w-full">
      <CardHeader>
        <CardAction>
          <MyRoadmapCardDropdownMenu roadmap={roadmap} />
        </CardAction>
        <div className="inline-flex items-center gap-4">
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <MyRoadmapCardFooter roadmapId={id} />
    </Card>
  );
}
