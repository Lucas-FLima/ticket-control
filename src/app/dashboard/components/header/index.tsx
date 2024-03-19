import { Container } from "@/components/Container";
import Link from "next/link";
import React from "react";

export function DashboardHeader() {
  return (
    <Container>
      <header className="w-full bg-gray-900 my-4 p-3 rounded flex gap-4 items-center">
        <Link
          className="text-white hover:font-bold duration-300"
          href="/dashboard"
        >
          Chamados
        </Link>
        <Link
          className="text-white hover:font-bold duration-300"
          href="/dashboard/customer"
        >
          Clientes
        </Link>
      </header>
    </Container>
  );
}
