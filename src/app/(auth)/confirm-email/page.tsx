import { MdOutlineMarkEmailRead } from 'react-icons/md';

export default function ConfirmEmailPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-center">
      <MdOutlineMarkEmailRead size={80} />
      <h1 className="text-2xl font-bold sm:whitespace-nowrap">
        Письмо успешно отправлено
      </h1>
      <p className="text-sm text-balance text-muted-foreground">
        Мы отправили вам письмо для подтверждения. Проверьте свою почту!
      </p>
    </div>
  );
}
