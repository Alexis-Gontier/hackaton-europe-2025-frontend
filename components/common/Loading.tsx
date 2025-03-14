import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className="h-full flex justify-center items-center animate-spin">
      <LoaderCircle size={64} />
    </div>
  )
}
