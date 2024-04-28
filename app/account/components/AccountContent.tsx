"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSubscribeModal, useUser } from "@/hooks";
import { postData } from "@/libs/helpers";
import toast from "react-hot-toast";
import Button from "@/components/Button";

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { user, subscription, isLoading } = useUser();

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

  return (
    <div className="mb-7 px-6">
      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>No active plan.</p>
          <Button
            className="w-[300px]"
            onClick={subscribeModal.onOpen}
          >
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>Current plan: <b>{subscription?.prices?.products?.name}</b></p>
          <Button
            className="w-[300px]"
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
          >
            Manage Subscription
          </Button>
        </div>
      )}
    </div>
  )
}

export default AccountContent
