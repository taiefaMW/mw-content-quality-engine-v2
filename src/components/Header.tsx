import logo from '@/assets/myworks-logo.png';

export function Header() {
  return (
    <header className="flex flex-col items-center py-8 space-y-3">
      <img 
        src={logo} 
        alt="MyWorks" 
        className="h-10 md:h-12 object-contain"
      />
      <h1 className="font-heading text-3xl md:text-4xl font-semibold text-primary text-center">
        Content Quality Engine
      </h1>
      <p className="text-xs md:text-sm text-muted-foreground text-center whitespace-nowrap">
        Score and approve LinkedIn posts against proven performance patterns
      </p>
    </header>
  );
}
