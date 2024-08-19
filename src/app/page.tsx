import dynamic from 'next/dynamic';

const MultiStepForm = dynamic(() => import('../components/MultiStepForm'), { ssr: false });

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 h-screen flex items-center justify-center">
      <MultiStepForm />
    </main>
  );
}
