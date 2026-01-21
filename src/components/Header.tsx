import logo from '@/assets/myworks-logo.png';

export function Header() {
  return (
    <header className="flex justify-center py-6">
      <img 
        src={logo} 
        alt="MyWorks" 
        className="h-8 md:h-10 object-contain"
      />
    </header>
  );
}
