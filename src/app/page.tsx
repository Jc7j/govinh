import dynamic from 'next/dynamic';

const MultiStepForm = dynamic(() => import('../components/MultiStepForm'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <MultiStepForm />
    </main>
  );
}
