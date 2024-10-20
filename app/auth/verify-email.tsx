
import { useRouter } from "next/router";
import { useToast } from "../../components/ui/use-toast";
import { useEffect, useState } from "react";


export default function VerifyEmail() {
  const router = useRouter();
  const { token } = router.query;
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetch(`/api/auth/verify-email?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
             addToast({
               id: Math.random().toString(36).substr(2, 9),
               message: "Email Verified",
               description: "Your email has been verified successfully.",
               variant: "success"
            });
            router.push("/auth/signin");
          } else {
            addToast({
              id: Math.random().toString(36).substr(2, 9),
              message: "Error",
              description: data.error,
              variant: "destructive"
            });
          }
        })
        .catch(() => {
           addToast({
             id: Math.random().toString(36).substr(2, 9),
             message: "Error",
             description: "An error occurred. Please try again.",
             variant: "destructive"
          });
        })
        .finally(() => setLoading(false));
    }
  }, [token, router, addToast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-blue-600">Verifying Email...</h2>
        </div>
      </div>
    );
  }

  return null;
}
