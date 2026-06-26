import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <main>
      <section className="container py-24 mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <Badge variant="outline">🚀 Новая платформа для обучения</Badge>

            <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Изучайте технологии
              <span className="text-primary"> по понятным Roadmap</span>
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground">
              Roadmap Hub помогает структурировать процесс обучения. Создавайте
              собственные дорожные карты, изучайте готовые маршруты, сохраняйте
              понравившиеся Roadmap и делитесь знаниями с другими
              разработчиками.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/sign-up">
                  Присоединиться
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center px-2">
            <Image
              src="/images/preview.png"
              alt="Редактор Roadmap Hub"
              width={1280}
              height={720}
              priority
              className="h-auto w-full max-w-md rounded-xl border shadow-xl sm:max-w-lg lg:max-w-none"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
