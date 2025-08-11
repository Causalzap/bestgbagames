// src/components/layout/PageTitle.tsx
import { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle?: string;
  accentColor?: 'purple' | 'blue' | 'red';
  children?: ReactNode;
};

export default function PageTitle({ 
  title, 
  subtitle, 
  accentColor = 'purple',
  children 
}: Props) {
  // 根据主题色配置渐变
  const gradientClasses = {
    purple: 'from-purple-700 to-purple-900',
    blue: 'from-blue-700 to-blue-900',
    red: 'from-red-700 to-red-900'
  };
  
  return (
    <div className={`bg-gradient-to-r ${gradientClasses[accentColor]} py-10 px-4 mb-8`}>
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-lg text-purple-200 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
        
        {children}
      </div>
    </div>
  );
}
