"use client";

import { CustomerProps } from "@/utils/customer.type";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export function CardCustomer({ customer }: { customer: CustomerProps }) {
  const router = useRouter();

  async function handleDeleteCustomer() {
    try {
      await api.delete(`/api/customer`, {
        params: {
          id: customer.id,
        },
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 relative">
      <h2 className="font-bold">
        <a className="font-bold">Nome:</a> {customer.name}
      </h2>
      <p>
        <a className="font-bold">Email:</a> {customer.email}
      </p>
      <p>
        <a className="font-bold">Telefone:</a> {customer.phone}
      </p>
      <p>
        <a className="font-bold">Endereço:</a> {customer.address}
      </p>
      <button
        onClick={handleDeleteCustomer}
        className="bg-[#f05c49] px-4 rounded text-white mt-2 hover:scale-105 duration-300"
      >
        Deletar
      </button>
    </article>
  );
}
