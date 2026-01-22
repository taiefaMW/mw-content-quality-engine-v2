import logo from '@/assets/myworks-logo.png';

export function Header() {
  return (
    <header className="flex flex-col items-center py-8 space-y-3">
      <img 
        src={logo} 
        alt="MyWorks" 
        className="h-10 md:h-12 object-contain"
      />
      <h1 className="font-heading text-2xl md:text-3xl font-semibold text-primary text-center">
        Content Quality Engine
      </h1>
      <p className="text-sm md:text-base text-muted-foreground text-center max-w-md">
        Score and approve LinkedIn posts against proven performance patterns
      </p>
    </header>
  );
}
