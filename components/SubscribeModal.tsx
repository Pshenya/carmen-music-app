"use client";

import { useState } from "react";
import { getStripe } from "@/libs/stripeClient";
import { postData } from "@/libs/helpers";
import toast from "react-hot-toast";
import { useSubscribeModal, useUser } from "@/hooks";
import { Price, ProductWithPrice } from "@/types";
import Modal from "./Modal";
import Button from "./ui/Button";
import { Glow, GlowCapture } from "@codaworks/react-glow";

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0
  }).format((price.unit_amount || 0) / 100);

  return priceString;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
  const subscribeModal = useSubscribeModal();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const { user, isLoading, subscription } = useUser();

  const onChange = (open: boolean) => {
    subscribeModal.onClose();
  }

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error('You need to be logged in to subscribe, my friend');
    }

    if (subscription) {
      setPriceIdLoading(undefined);
      return toast("You're already subscribed, my friend");
    }

    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price }
      });

      console.log("SUBSCRIBING: ", sessionId);

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });

      console.log("STIPE:", stripe)
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    } finally {
      setPriceIdLoading(undefined);
    }
  }

  let content = (
    <div className="text-center">
      No products available
    </div>
  );

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return (
              <div key={product.id}>
                No prices available for {product.name}
              </div>
            )
          }

          return product.prices.map((price) => (
            <>
              <GlowCapture>
                <Glow color="gradient">
                  <Button
                    key={price.id}
                    onClick={() => handleCheckout(price)}
                    disabled={isLoading || price.id === priceIdLoading}
                    className="mb-10 gradient"
                  >
                    {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                  </Button>
                  <p className="text-center">
                    This is a <span className="text-primary font-bold">DUMMY</span> subscription.<br/>
                    You will <span className="text-primary font-bold">NOT</span> be charged. <br/>
                  </p>
                  <p className="text-center mt-2">
                    Use card <span className="text-primary">4242 4242 4242 4242</span> and try it for free 😇
                  </p>
                </Glow>
              </GlowCapture>
            </>
          ))
        })}
      </div>
    )
  }

  if (subscription) {
    content = (
      <div className="text-center">
        You&apos;re already subscribed, my friend
      </div>
    )
  }

  return (
    <Modal
      title="Carmen Premium"
      description="You can only stream music for 30 seconds. Subsribe to remove all the restrictions"
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
      className="subscribe-modal"
    >
      {content}
    </Modal>
  )
}

export default SubscribeModal
