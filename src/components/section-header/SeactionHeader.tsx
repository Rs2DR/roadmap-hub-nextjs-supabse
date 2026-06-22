interface SeactionHeaderProps {
  title: string;
  description: string;
}

export function SeactionHeader({ title, description }: SeactionHeaderProps) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <h2 className="text-4xl">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
