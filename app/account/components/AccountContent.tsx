"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlayer, useSubscribeModal, useUser } from "@/hooks";
import { postData } from "@/libs/helpers";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import { Glow, GlowCapture } from "@codaworks/react-glow";

const AccountContent = () => {
  const router = useRouter();
  const player = usePlayer();
  const supabaseClient = useSupabaseClient();
  const subscribeModal = useSubscribeModal();
  const { user, subscription, isLoading, userDetails } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link',
      });
      window.location.assign(url);
    } catch (error) {
      if (error) {
        toast.error((error as Error).message);
      }
    }
    setLoading(false);
  }

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully!");
    }
  }

  return (
    <div className="mb-7 px-6 bg-black bg-opacity-65 backdrop-blur h-full">
      <h1>Username: <span className="font-bold">{userDetails?.username}</span></h1>
      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>You are not a premium member.</p>
          <GlowCapture>
            <Glow color='gradient'>
              <Button
                className="w-[300px] bg-primary"
                onClick={subscribeModal.onOpen}
              >
              Subscribe
            </Button>
            </Glow>
          </GlowCapture>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p className="text-lg">Current plan: <b className="text-primary">{subscription?.prices?.products?.name}</b></p>
          <GlowCapture>
            <Glow color='gradient'>
              <Button
                className="w-[300px] text-black bg-indigo-200 border-none glow:opacity-100 glow:blur-2 glow:gradient glow:spread-2 glow:radius-5"
                disabled={loading || isLoading}
                onClick={redirectToCustomerPortal}
              >
                Manage Subscription
              </Button>
            </Glow>
          </GlowCapture>
        </div>
      )}

      <div className="mt-5">
        <Button
          className="w-32 bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-black hover:border-opacity-0 transition-all"
          onClick={handleLogout}
        >
          Log out
        </Button>
      </div>
    </div>
  )
}

export default AccountContent
