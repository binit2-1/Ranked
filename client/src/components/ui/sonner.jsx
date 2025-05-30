import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        style: {
          color: '#fff',
        },
        className: '!text-white',
        success: {
          style: {
            background: 'linear-gradient(90deg, #a21caf 0%, #7c3aed 100%)', // Tailwind fuchsia-700 to purple-600
            color: '#fff',
            boxShadow: '0 2px 16px 0 rgba(236, 72, 153, 0.25)',
          },
          className: '!text-white font-semibold',
        },
        error: {
          style: {
            background: '#101010',
            color: '#fff',
          },
          className: '!text-white',
        },
      }}
      {...props} />
  );
}

export function showSuccess(message) {
  toast.success(message, {
    duration: 3000,
    position: "bottom-center",
    style: {
      background: 'linear-gradient(90deg, #a21caf 0%, #7c3aed 100%)', // Tailwind fuchsia-700 to purple-600
      color: '#fff',
      boxShadow: '0 2px 16px 0 rgba(236, 72, 153, 0.25)',
    },
    className: '!text-white font-semibold',
  });
}

export function showError(message) {
  toast.error(message, {
    duration: 3000,
    position: "bottom-center",
    style: { background: '#101010', color: '#fff' },
    className: '!text-white',
  });
}

export { Toaster }
