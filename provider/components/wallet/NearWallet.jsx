"use client";

import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import "@near-wallet-selector/modal-ui/styles.css";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NearWallet() {
  const router = useRouter();

  const [selector, setSelector] = useState(null);

  if (selector != null) {
  }

  useEffect(() => {
    setupWalletSelector({
      network: "testnet",
      modules: [setupMyNearWallet()],
    }).then((res) => {
      setSelector(res);
    });
  }, []);

  const signIn = async () => {
    const modal = setupModal(selector, {
      contractId: "guest-book.testnet",
    });

    modal.show();
  };

  const signOut = async () => {
    const wallet = await selector.wallet("my-near-wallet");

    wallet.signOut();
    router.refresh();
  };

  return (
    <>
      {selector == null ? null : !selector.isSignedIn() ? (
        <button onClick={signIn}>Near 연결</button>
      ) : (
        <button onClick={signOut}>Near 연결해제</button>
      )}
    </>
  );
}
