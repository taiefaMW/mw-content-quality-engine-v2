import logo from '@/assets/myworks-logo-white.png';
import underline from '@/assets/underline.png';

export function Header() {
  return (
    <header className="flex flex-col items-center py-8 space-y-3">
      <img 
        src={logo} 
        alt="MyWorks" 
        className="h-10 md:h-12 object-contain"
      />
      <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white text-center">
        Content{' '}
        <span className="relative inline-block">
          Quality
          <img 
            src={underline} 
            alt="" 
            className="absolute left-0 right-0 -bottom-2 w-full h-auto pointer-events-none"
          />
        </span>{' '}
        Engine
      </h1>
      <p className="text-xs md:text-sm text-white/80 text-center whitespace-nowrap">
        Score and approve LinkedIn posts against proven performance patterns
      </p>
    </header>
  );
}
