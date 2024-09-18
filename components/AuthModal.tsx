"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useRef } from "react";
import { useAuthModal, useUser } from "@/hooks";
import Modal from "./Modal";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { isOpen, onClose } = useAuthModal();
  const { userDetails } = useUser();
  const authStateChange = useRef(false);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  useEffect(() => {
    console.log('authModal');
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {

      if (event === 'SIGNED_IN' && !authStateChange.current && !userDetails?.username) {
        authStateChange.current = true;
        router.push("/profile-completion");
        onClose();
      }
    });

    if (session) {
      router.refresh();
      onClose();
    }

    return () => authListener.subscription.unsubscribe();
  }, [router, supabaseClient, onClose, session, userDetails?.username]);

  return (
    <Modal title="Welcome" isOpen={isOpen} onChange={onChange}>
      <Auth
        theme="dark"
        providers={['github']}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#FF5D73",
                brandAccent: "#ff7285",
              }
            }
          }
        }}
      />
    </Modal>
  )
}

export default AuthModal
