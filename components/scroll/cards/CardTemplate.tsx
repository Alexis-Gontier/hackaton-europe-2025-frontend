import {
  Card,
  CardContent,
} from "@/components/ui/card"

interface RootLayoutProps {
  children: React.ReactNode;
  shadowColor?: 'blue' | 'red' | 'green';
}

const shadowColorMap = {
  blue: 'shadow-blue-500/40',
  red: 'shadow-red-500/40',
  green: 'shadow-green-500/40',
};

export default function CardTemplate({
  children,
  shadowColor = 'blue',
}: RootLayoutProps) {
  const shadowClass = shadowColorMap[shadowColor];

  return (
    <div className={`h-card shadow-md ${shadowClass}`}>
        {children}
    </div>
  );
}
