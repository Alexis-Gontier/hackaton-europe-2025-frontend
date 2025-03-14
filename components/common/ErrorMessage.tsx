interface ErrorMessageProps {
  error: string;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <pre className="text-red-500">
        {error}
    </pre>
  )
}
