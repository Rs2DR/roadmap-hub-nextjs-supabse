import { FilterInput } from '@/components/filter-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

export default async function DashboardPage() {
  return (
    <div className="px-4 pt-2">
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-4xl">Опубликованные Roadmaps</h2>
        <p className="text-muted-foreground">
          Изучай, сохраняй и проходи лучшие дорожные карты
        </p>
      </div>
      <div className="inline-flex items-end gap-4 w-full">
        <FilterInput />
        <Select defaultValue="new">
          <SelectTrigger className="w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="new">Сначала новые</SelectItem>
            <SelectItem value="old">Сначала старые</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
