interface ErrorMessageProps {
  message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-4 mb-6">
      <p className="text-destructive font-medium">{message}</p>
    </div>
  )
}
